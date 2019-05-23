import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import usePageLoad from './usePageLoad'
import useCheckQueryStatus from './useCheckQueryStatus';

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

const fetchMoreHandler = (prev, fetchMoreResult) => {
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
};

const dataToProps = data => ({ repositories: data.user.repositories.nodes, user: data.user })
const getPageInfo = data => data.user.repositories.pageInfo;

const useUserByLogin = ({
    login = '',
    repositoriesPerPage = 5,
    ...checkedQueryProps
}) => {
    const queryResultProps = useQuery(searchQuery, { variables: { login, repositoriesPerPage } });
    return usePageLoad({ fetchMoreHandler, dataToProps, getPageInfo, queryResultProps, checkedQueryProps });
}


export default useUserByLogin;