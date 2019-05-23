import useCheckQueryStatus from './useCheckQueryStatus';

const usePageLoad = ({ fetchMoreHandler, dataToProps, getPageInfo, query, queryResultProps, checkedQueryProps }) => {
    const { fetchMore, data, variables, loading, error } = queryResultProps
    const loadedProps = () => {
        if (!loading && !error) {
            const pageInfo = getPageInfo(data);
            const hasNextPage = pageInfo.hasNextPage;
            return {
                loadMore: () =>
                    fetchMore({
                        query,
                        variables: { ...variables, cursor: pageInfo.endCursor },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (hasNextPage) return fetchMoreHandler(prev, fetchMoreResult)
                            return prev
                        }
                    }),
                hasNextPage: { hasNextPage },
                ...dataToProps(data)
            }
        }
        return {}
    }
    return useCheckQueryStatus({
        ...checkedQueryProps, queryResultProps, loadedProps
    })
}

export default usePageLoad;