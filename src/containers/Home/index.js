import React from 'react';
import RepositoryList from '../../components/RepositoryList';
import useUserByLogin from '../../QueryHooks/useUserByLogin';
import useUserSearch from '../../QueryHooks/useUserSearch';
import SearchList from '../../components/SearchList';

const Home = () => {

    const searchList = useUserSearch({
        search: "ad",
        itemsPerPage: 3,
        LoadedComponent: SearchList,
        ErrorComponent: ({error}) => <p>{error.message}</p>,
        LoaderComponent: () => <p>Loading...</p>
    }) 

    const userProfile = useUserByLogin({
        login: '',
        repositoriesPerPage: 5,
        LoadedComponent: RepositoryList,
        LoaderComponent: () => <p>Loading...</p>
    })
    return <React.Fragment>
        {searchList}
        {userProfile}
    </React.Fragment>
}

export default Home;