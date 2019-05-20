import React from 'react';
import { Query } from 'react-apollo';
import Loader from '../components/Loader';
import gql from 'graphql-tag';

const query = gql`
query ($login: String! $repositoriesPerPage: Int! $cursor: String) {
    user(login: $login){
        repositories(orderBy: {field: CREATED_AT, direction: ASC} first: $repositoriesPerPage after: $cursor) {
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
}`

const withUserRepositories = (WrappedComponent) => ({ login, repositoriesPerPage }) =>

    <Query query={query} variables={{ login, repositoriesPerPage }}>
        {({ data, loading, error, fetchMore, networkStatus }) => {

            if (loading ||
                networkStatus < 7) return <Loader />
            if (error || networkStatus === 8) return <p>{error.message}</p>

            const repositories = data.user.repositories.nodes;
            const hasNextPage = data.user.repositories.pageInfo.hasNextPage;
            return < WrappedComponent
                loadMore={() =>
                    fetchMore({
                        query,
                        variables: { login, repositoriesPerPage, cursor: data.user.repositories.pageInfo.endCursor },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            const { user: { repositories } } = fetchMoreResult;
                            const prevRepositories = prev.user.repositories;
                            const prevNodes = prevRepositories.nodes;
                            const newNodes = repositories.nodes;
                            const pageInfo = repositories.pageInfo;
                            return {
                                user: {
                                    __typename: prev.user.__typename,
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
                notifyOnNetworkStatusChang={true}
                hasNextPage={hasNextPage}
                repositories={repositories}
                login={login} />
        }
        }
    </Query>

export default withUserRepositories