import UserHeader from './UserHeader'
import LanguageHeader from './LanguageHeader';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {v5, v1} from '../../styles/colors';

const Profile = ({ type = "User", name = "" }) => {
    return (
            <div className="profile__header" css={css`
                background-color: ${v5};
                color: ${v1};
            `}>
                {type === "User" && <UserHeader name={name} />}
                {type === "Language" && <LanguageHeader type={type} name={name} />}
            </div>
    )


}

export default Profile;