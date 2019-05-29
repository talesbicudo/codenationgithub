import gql from 'graphql-tag';
import useCheckedQuery from './useCheckedQuery';


const mapDataToProps = ({ search }) => ({
    repositories: search.nodes,
    totalCount: search.repositoryCount,
    ...search.pageInfo
})


const getPageInfo = data => data.search.pageInfo;

const fetchMoreMoreHandler = (prev, next) => {
    console.log('hi');
    const prevNodes = prev.search.nodes,
        fetchNodes = next.search.nodes,
        pageInfo = prev.search.pageInfo;
    return {
        search: {
            __typename: prev.search.__typename,
            repositoryCount: prev.search.repositoryCount,
            pageInfo,
            nodes: [...prevNodes, ...fetchNodes]
        }
    }

}

const useRepositoriesWithSearch = ({
    fetchProps = "name",
    itemsPerPage = 1,
    search = "",
}) => {
    const fragment = gql`
        fragment RepositoriesParts on Repository {
            ${fetchProps}
        }
    `
    const query = gql`
        query ($search: String! $itemsPerPage: Int! $cursor: String){
            search(type: REPOSITORY, query: $search first: $itemsPerPage after: $cursor) {
                repositoryCount
                nodes {
                    ... on Repository {
                        ...RepositoriesParts
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
        ${fragment}`
    return useCheckedQuery(query, mapDataToProps,
        { variables: { search, itemsPerPage, cursor: null } }, { getPageInfo, fetchMoreMoreHandler })
}

export default useRepositoriesWithSearch;