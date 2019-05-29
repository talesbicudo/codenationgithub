import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    avatar: {
        margin: '1rem',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    bigAvatar: {
        height: '10rem',
        width: '10rem'
    }

});

const UserAvatar = ({ name, big, avatarUrl }) => {
    const classes = useStyles();
    return (
        <div data-testid="UserAvatarContainer">
            <Avatar className={`${big ? classes.bigAvatar : ''} ${classes.avatar}`} alt={name} src={avatarUrl} />
        </div>
    )
}

UserAvatar.propTypes = {
    name: PropTypes.string,
    big: PropTypes.bool,
    avatarUrl: PropTypes.string
}

export default UserAvatar;
