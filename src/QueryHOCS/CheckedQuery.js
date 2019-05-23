import React from 'react';
import { Query } from 'react-apollo';

const CheckedQuery =
    ({
        children = queryData => null,
        LoaderComponent = () => null,
        ErrorComponent = ({error}) => null,
        onLoading = () => null,
        onError = error => null,
        ...queryProps }) => (
            <Query {...queryProps} notifyOnNetworkStatusChange={true}>
                {queryData => {
                    const { loading, error, networkStatus } = queryData;
                    if (loading ||
                        networkStatus < 7) {
                        onLoading();
                        return <LoaderComponent />
                    }
                    if (error || networkStatus === 8) {
                        onError(error);
                        return <ErrorComponent error={error} />
                    }
                    return children(queryData);
                }}
            </Query>
        )

export default CheckedQuery;