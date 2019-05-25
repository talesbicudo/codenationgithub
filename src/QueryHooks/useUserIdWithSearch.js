import gql from 'graphql-tag';
import  useCheckedQuery  from './useCheckedQuery';

const query = gql`
query ($query: String! $itemsPerPage: Int! $cursor: String) {
    search(query: $query, type: USER first: $itemsPerPage after: $cursor){
        nodes {
            ... on User {
                id
                login
            }
            
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}
`
const fetchMoreHandler = (prev, fetchMoreResult) => {
    const prevNodes = prev.search.nodes;
    const fetchNodes = fetchMoreResult.search.nodes;
    const pageInfo = prev.search.pageInfo;
    return {
        search: {
            __typename: prev.search.__typename,
            nodes: {
                nodes: [...prevNodes, ...fetchNodes],
                __typename: prev.nodes.__typename,
                pageInfo
            }
        }
    }
};


const useUserIdWithSearch= ({
    search = '',
    itemsPerPage = 3
}) => {
    const getPageInfo = data => data.search.pageInfo;
    const mapDataToProps = data => ({
        users: data.search.nodes
    })

    const queryResultProps = useCheckedQuery(query, mapDataToProps, { variables: { query: search, itemsPerPage } });
    return {...queryResultProps, getPageInfo, fetchMoreHandler, mapDataToProps};
}


export default useUserIdWithSearch;