import React from 'react'
import useUserWithLogin from '../../QueryHooks/useUserWithLogin';
import Header from '../../components/Header';

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
        <React.Fragment>
            <Header
                avatar={<img alt={user.login} src={user.avatarUrl} style={{ minHeight: '100%' }} />}
                name={user.login}
                totalCount={user.repositories.totalCount}
            />

        </React.Fragment>
    )
}

export default UserHeader;