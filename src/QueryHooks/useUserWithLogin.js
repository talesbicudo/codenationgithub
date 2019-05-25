import gql from 'graphql-tag';
import useCheckedQuery from './useCheckedQuery'

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
const otherUserQuery = gql`
query ($login: String! $repositoriesPerPage: Int! $cursor: String) {
    user(login: $login){
       ...UserParts 
    }
}
${UserFragment}
`
const viewerQuery = gql`
query ($repositoriesPerPage: Int! $cursor: String) {
    user: viewer {
        ...UserParts
    }
}
${UserFragment}
`

const fetchMoreHandler = (prev, fetchMoreResult) => {
    const { user: { repositories } } = fetchMoreResult;
    const prevRepositories = prev.user.repositories;
    const prevNodes = prevRepositories.nodes;
    const newNodes = repositories.nodes;
    const pageInfo = repositories.pageInfo;
    return {
        user: {
            __typename: prev.user.__typename,
            login: prev.login,
            repositories: {
                totalCount: prevRepositories.totalCount,
                nodes: [...prevNodes, ...newNodes],
                __typename: prevRepositories.__typename,
                pageInfo
            }
        }
    }
};

const mapDataToProps = data => ({ repositories: data.user.repositories.nodes, user: data.user })
const getPageInfo = data => data.user.repositories.pageInfo;

const useUserWithLogin = ({
    login = '',
    repositoriesPerPage = 5,
    ...queryProps
}) => {
    const query = login ? otherUserQuery : viewerQuery;
    const variables = { login, repositoriesPerPage };
    const queryResultProps = useCheckedQuery(query, mapDataToProps, { variables, ...queryProps });
    return { fetchMoreHandler, getPageInfo, ...queryResultProps }
}


export default useUserWithLogin;