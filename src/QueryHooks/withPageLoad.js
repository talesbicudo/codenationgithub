
const withPageLoad = ({ fetchMoreHandler, getPageInfo, ...queryProps }) => {
    const { fetchMore, data, loading, error, variables } = queryProps;
    if (!loading || !error) return queryProps;
    debugger
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
        ...queryProps
    }
}
export default withPageLoad;