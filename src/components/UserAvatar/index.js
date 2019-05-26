import React from 'react';
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

const LanguageAvatar = ({ name, big, avatarUrl }) => {
    const classes = useStyles();
    return (
        <Avatar className={`${big ? classes.bigAvatar : ''} ${classes.avatar}`} alt={name} src={avatarUrl} />
    )
}

export default LanguageAvatar;