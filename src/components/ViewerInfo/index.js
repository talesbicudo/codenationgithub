import React from 'react';
import Box from '@material-ui/core/Box';
import UserAvatar from '../UserAvatar';
import { Link } from 'react-router-dom';

const ViewerInfo = ({ login="undefined", avatarUrl="#" }) => (
    <Box display="flex" justifyContent="space-around" alignItems="center">
        <Link to="/">
                <UserAvatar name={login} avatarUrl={avatarUrl} />
        </Link>
        <p>{login}</p>
    </Box>

)

export default ViewerInfo;
