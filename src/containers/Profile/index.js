import React from 'react';
import RepositoryList from '../../components/RepositoryList';
import useUserWithLogin from '../../QueryHooks/useUserWithLogin';
import withPageLoad from '../../QueryHooks/withPageLoad';
const Profile = ({ name }) => {

    const userProfile = withPageLoad(useUserWithLogin({
        login: name,
        repositoriesPerPage: 5
    }));

    const { loading, error, user, loadMore, hasNextPage } = userProfile;

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>


    return (
        <RepositoryList user={user} loadMore={loadMore} hasNextPage={hasNextPage} />
    )

}

export default Profile;