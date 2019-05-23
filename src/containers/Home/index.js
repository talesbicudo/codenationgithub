import React from 'react';
import RepositoryList from '../../components/RepositoryList';
import useUserByLogin from '../../QueryHooks/useUserByLogin';

const Home = () => {
    return useUserByLogin({
        login: 'andrew',
        repositoriesPerPage: 5,
        LoadedComponent: RepositoryList,
        LoaderComponent: () => <p>Loading...</p>
    })
}

export default Home;