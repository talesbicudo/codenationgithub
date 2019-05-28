import { useQuery } from 'react-apollo-hooks';
import { useSnackbar } from 'notistack';

const useCheckedQuery =
    (query, mapDataToProps = data => data, queryArgs) => {
        const queryProps = useQuery(query, { ...queryArgs, notifyOnNetworkStatusChange: true });
        const { enqueueSnackbar } = useSnackbar();
        const { loading, error, data, networkStatus } = queryProps;
        if (loading ||
            networkStatus < 7) {
            return { ...queryProps, loading: true }
        }
        if (error) {
            enqueueSnackbar(error.message);
            return { ...queryProps, error }
        }
        return { ...mapDataToProps(data), ...queryProps };
    }

export default useCheckedQuery;