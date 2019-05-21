import React from 'react';
import CheckedQuery from './CheckedQuery';
import gql from 'graphql-tag';

const UserFragment = gql`
    fragment UserParts on User {
        login
        repositories(orderBy: {field: CREATED_AT, direction: ASC} first: $repositoriesPerPage after: $cursor) {
            totalCount
            nodes {
                name
                id
                createdAt
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`
const searchQuery = gql`
query ($login: String! $repositoriesPerPage: Int! $cursor: String) {
    user(login: $login){
       ...UserParts 
    }
}
${UserFragment}
`
const loggedQuery = gql`
query ($repositoriesPerPage: Int! $cursor: String) {
    viewer {
        ...UserParts
    }
}
${UserFragment}
`
const withUser = (WrappedComponent) => ({ isLogged=false, login='', repositoriesPerPage=5, ...queryProps }) => {
    const [query, userType] = (isLogged || !login.length) ? [loggedQuery, 'viewer'] : [searchQuery, 'user'];
    return (
        <CheckedQuery query={query} variables={{ login, repositoriesPerPage }} {...queryProps}>
            {({ data, fetchMore }) => {
                const user = data[userType];
                const repositories = user.repositories.nodes;
                const hasNextPage = user.repositories.pageInfo.hasNextPage;
                return < WrappedComponent
                    loadMore={() =>
                        fetchMore({
                            query,
                            variables: { login, repositoriesPerPage, cursor: data.user.repositories.pageInfo.endCursor },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                const { [userType]: { repositories } } = fetchMoreResult;
                                const prevRepositories = prev[userType].repositories;
                                const prevNodes = prevRepositories.nodes;
                                const newNodes = repositories.nodes;
                                const pageInfo = repositories.pageInfo;
                                return {
                                    [userType]: {
                                        __typename: prev[userType].__typename,
                                        repositories: {
                                            nodes: [...prevNodes, ...newNodes],
                                            __typename: prevRepositories.__typename,
                                            pageInfo
                                        }
                                    }
                                }
                            }
                        }
                        )
                    }
                    hasNextPage={hasNextPage}
                    repositories={repositories}
                    user={user}
                />
            }
            }
        </CheckedQuery>
    )
}
export default withUser