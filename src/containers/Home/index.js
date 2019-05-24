import React from 'react';
import RepositoryList from '../../components/RepositoryList';
import useUserByLogin from '../../QueryHooks/useUserByLogin';
import useUserOrLangSearch from '../../QueryHooks/useUserOrLangSearch';
import SearchList from '../../components/SearchList';

const Home = () => {

    const searchList = useUserOrLangSearch({
        search: "ada",
        itemsPerPage: 3,
        LoadedComponent: SearchList,
        ErrorComponent: ({error}) => <p>{error.message}</p>
    }) 

    const userProfile = useUserByLogin({
        login: 'ada-lovecraft',
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