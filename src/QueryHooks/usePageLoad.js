import useCheckQueryStatus from './useCheckQueryStatus';

const usePageLoad = ({ fetchMoreHandler, dataToProps, getPageInfo, query, queryResultProps, checkedQueryProps }) => {
    const { fetchMore, data, variables } = queryResultProps
    const loadedProps = () => {
        const pageInfo = getPageInfo(data);
        const hasNextPage = pageInfo.hasNextPage;
        return {
            loadMore: () =>
                fetchMore({
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
    return useCheckQueryStatus({
        ...checkedQueryProps, queryResultProps, loadedProps
    })
}

export default usePageLoad;