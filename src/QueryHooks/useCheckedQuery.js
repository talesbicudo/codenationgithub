import { useQuery } from 'react-apollo-hooks';

const useCheckedQuery =
    (query, mapDataToProps, queryArgs) => {
        const queryProps = useQuery(query, { ...queryArgs, notifyOnNetworkStatusChange: true });
        const { loading, error, data, networkStatus } = queryProps;
        if (loading ||
            networkStatus < 7) {
            return { ...queryProps, loading: true }
        }
        if (error || networkStatus === 8) {
            return { ...queryProps, error }
        }
        return { ...mapDataToProps(data), ...queryProps };
    }

export default useCheckedQuery;