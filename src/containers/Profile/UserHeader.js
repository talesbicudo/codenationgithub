import React from 'react'
import useUserWithLogin from '../../QueryHooks/useUserWithLogin';
import Header from '../../components/Header';
import UserAvatar from '../../components/UserAvatar';

const UserHeader = ({ name }) => {

    const fetchProps = `
        avatarUrl
        login
        repositories(first: 1) {
            totalCount
        }
    `
    const { loading, user } = useUserWithLogin({ login: name, fetchProps })

    if (loading) return null;

    return (
        <Header
            avatar={<UserAvatar big alt={user.login} avatarUrl={user.avatarUrl} />}
            name={user.login}
            totalCount={user.repositories.totalCount}
        />

    )
}

export default UserHeader;