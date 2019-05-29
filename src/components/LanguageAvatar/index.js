import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

const useStyles = color => makeStyles({
    avatar: {
        margin: '1rem',
    },
    bigAvatar: {
        margin: '1rem',
        width: '10rem',
        height: '10rem',
        fontSize: '8rem'
    },
});

const LanguageAvatar = ({ color="#ffffff", big=false, name="Undefined Language" }) => {

    const classes = useStyles()();

    return (
        <Avatar data-testid="LangAvatar" style={{backgroundColor: color}} className={big ? classes.bigAvatar : classes.avatar}><p css={css`
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        `}>{[...name].slice(0, 1)}</p></Avatar>
    )
}

LanguageAvatar.propTypes = {
    color: PropTypes.string,
    big: PropTypes.bool,
    name: PropTypes.string
}

export default LanguageAvatar;
