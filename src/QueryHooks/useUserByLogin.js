import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import usePageLoad from './usePageLoad'

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

const dataToProps = data => ({ repositories: data.user.repositories.nodes, user: data.user })
const getPageInfo = data => data.user.repositories.pageInfo;

const useUserByLogin = ({
    login = '',
    repositoriesPerPage = 5,
    ...checkedQueryProps
}) => {
    const query = login ? otherUserQuery : viewerQuery;
    const queryResultProps = useQuery(query, { variables: { login, repositoriesPerPage } });
    return usePageLoad({ fetchMoreHandler, dataToProps, getPageInfo, queryResultProps, checkedQueryProps });
}


export default useUserByLogin;