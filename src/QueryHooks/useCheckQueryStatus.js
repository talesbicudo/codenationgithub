import React from 'react';
const useCheckQueryStatus =
    ({
        LoaderComponent = () => null,
        ErrorComponent = ({ error }) => null,
        LoadedComponent = () => null,
        onLoading = () => null,
        onLoaded = () => null,
        onError = error => null,
        loadedProps = () => ({}),
        queryResultProps = {} }) => {
        const { loading, error, networkStatus } = queryResultProps;
        if (loading ||
            networkStatus < 7) {
            onLoading();
            return <LoaderComponent />
        }
        if (error || networkStatus === 8) {
            return <ErrorComponent error={error} />
        }
        onLoaded();
        return <LoadedComponent {...loadedProps()}/>
    }

export default useCheckQueryStatus;