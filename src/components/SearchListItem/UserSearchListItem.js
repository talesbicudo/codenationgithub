import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import UserAvatar from '../UserAvatar';

const UserSearchListItem = ({ login = "", avatarUrl = "" }) =>
    <React.Fragment>
        <ListItemAvatar>
            <UserAvatar name={login} avatarUrl={avatarUrl} />
        </ListItemAvatar>
        <ListItemText primary={login} />
    </React.Fragment>


export default UserSearchListItem;