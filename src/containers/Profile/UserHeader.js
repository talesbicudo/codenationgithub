import React from 'react'
import useRepositoriesWithSearch from '../../QueryHooks/useRepositoriesWithSearch';
import Header from '../../components/Header';
import UserAvatar from '../../components/UserAvatar';
import Box from '@material-ui/core/Box';

const UserHeader = ({ name }) => {

    const fetchProps = `
        owner {
            login
            avatarUrl
       } 
    `
    const { loading, repositories, totalCount } = useRepositoriesWithSearch({ search: `is:public fork:true user:${name}`, fetchProps })


    if (loading) return null;

    const user = repositories.length ? repositories[0].owner : ''

    return (

        <Box display="flex" height="100%" alignItems="center">
            {repositories.length ?
                <Header
                    avatar={<UserAvatar big alt={user.login} avatarUrl={user.avatarUrl} />}
                    name={user.login}
                    totalCount={totalCount}
                /> :
                <h1>Usuário não achado</h1>
        
    }
        </Box>

    )
}

export default UserHeader;