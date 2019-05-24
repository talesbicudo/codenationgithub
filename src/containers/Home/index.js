import React from 'react';
import RepositoryList from '../../components/RepositoryList';
import useUserByLogin from '../../QueryHooks/useUserByLogin';
import MainSearch from '../MainSearch';

export const Home = ({user}) => {


    const userProfile = useUserByLogin({
        login: user,
        repositoriesPerPage: 5,
        LoadedComponent: RepositoryList,
        LoaderComponent: () => <p>Loading...</p>
    })

    return (
        <React.Fragment>
            <MainSearch initialValue={user}/>
            <hr />
            {userProfile}
        </React.Fragment>
    )
}




export default Home; 