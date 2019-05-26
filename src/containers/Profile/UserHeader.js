import React from 'react'
import useUserWithLogin from '../../QueryHooks/useUserWithLogin';
import Header from '../../components/Header';

const UserHeader = ({ name }) => {

    const fetchProps = `
        avatarUrl
        repositories(first: 1) {
            totalCount
        }
    `
    const { loading, user } = useUserWithLogin({ login: name, fetchProps })

    if (loading) return <p>Loading...</p>;

    return (
        <React.Fragment>
            <Header
                avatar={<img alt={name} src={user.avatarUrl} style={{ minHeight: '100%' }} />}
                name={name}
                totalCount={user.repositories.totalCount}
            />

        </React.Fragment>
    )
}

export default UserHeader;