import React from 'react'
import useRepositoriesWithSearch from '../../QueryHooks/useRepositoriesWithSearch';
import Header from '../../components/Header';
import UserAvatar from '../../components/UserAvatar';

const UserHeader = ({ name }) => {

    const fetchProps = `
        owner {
            login
            avatarUrl
       } 
    `
    const { loading, repositories, totalCount } = useRepositoriesWithSearch({ search: `is:public fork:true user:${name}`, fetchProps })


    if (loading) return null;

    const user = repositories[0].owner;

    return (
        <Header
            avatar={<UserAvatar big alt={user.login} avatarUrl={user.avatarUrl} />}
            name={user.login}
            totalCount={totalCount}
        />

    )
}

export default UserHeader;