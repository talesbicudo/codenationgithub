import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import usePageLoad from './usePageLoad'

const query = gql`
query ($query: String! $itemsPerPage: Int! $cursor: String) {
    search(query: $query, type: USER first: $itemsPerPage after: $cursor){
        nodes {
            ... on User {
                id
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


const useUserOrLangSearch = ({
    search = '',
    itemsPerPage = 3,
    ...checkedQueryProps
}) => {
    const getPageInfo = data => data.search.pageInfo;
    const dataToProps = data => ({ items: data.search.nodes.map(node => ({type: 'user', id: node.id})) })
    const queryResultProps = useQuery(query, { variables: { query: search, itemsPerPage } });
    return usePageLoad({ fetchMoreHandler, dataToProps, getPageInfo, queryResultProps, checkedQueryProps });
}


export default useUserOrLangSearch;