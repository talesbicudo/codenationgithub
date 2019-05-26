import React from 'react'
import useUserWithLogin from '../../QueryHooks/useUserWithLogin';
import Header from '../../components/Header';
import FitParentImg from '../../components/FitParentImg';

const UserHeader = ({ name }) => {

    const fetchProps = `
        avatarUrl
        login
        repositories(first: 1) {
            totalCount
        }
    `
    const { loading, user } = useUserWithLogin({ login: name, fetchProps })

    if (loading) return <p>Loading...</p>;

    return (
            <Header
                avatar={<FitParentImg alt={user.login} src={user.avatarUrl} />}
                name={user.login}
                totalCount={user.repositories.totalCount}
            />

    )
}

export default UserHeader;