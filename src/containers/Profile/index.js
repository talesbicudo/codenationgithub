import { useContext } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import UserHeader from './UserHeader'
import LanguageHeader from './LanguageHeader';
import { v5, v1 } from '../../styles/colors';
import Viewer from '../../Contexts/Viewer';

export const Profile = ({ type = "User", name = "" }) => {
    const { login } = useContext(Viewer);

    return (
        <div className="profile__header" css={css`
                background-color: ${v5};
                color: ${v1};
            `}>
            {type === "User" && <UserHeader name={name || login} />}
            {type === "Language" && <LanguageHeader type={type} name={name} />}
        </div>
    )
}


export default Profile;