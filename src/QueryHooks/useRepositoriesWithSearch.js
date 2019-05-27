import gql from 'graphql-tag';
import useCheckedQuery from './useCheckedQuery';


const mapDataToProps = ({search}) => ({
    repositories: search.nodes,
    totalCount: search.repositoryCount,
    ...search.pageInfo
})

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
    return useCheckedQuery(query, mapDataToProps, {variables: {search, itemsPerPage, cursor: null}})
}

export default useRepositoriesWithSearch;