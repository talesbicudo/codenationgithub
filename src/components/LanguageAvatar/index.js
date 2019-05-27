import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = color => makeStyles({
    avatar: {
        margin: '1rem',
        backgroundColor: color
    },
    bigAvatar: {
        margin: '1rem',
        backgroundColor: color,
        width: '10rem',
        height: '10rem',
        fontSize: '8rem'
    },
});

const LanguageAvatar = ({ color, big, name }) => {
    const classes = useStyles(color)();

    return (
        <Avatar className={big ? classes.bigAvatar : classes.avatar}>{[...name].slice(0, 1)}</Avatar>
    )
}

LanguageAvatar.propTypes = {
    color: PropTypes.string,
    big: PropTypes.bool,
    name: PropTypes.string
}

export default LanguageAvatar;
