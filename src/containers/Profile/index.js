import React from 'react';
import UserHeader from './UserHeader'
import LanguageHeader from './LanguageHeader';

const Profile = ({ type = "User", name = "" }) => {

    return (
        <div className="profile">
            <div className="profile__header" style={{ height: '30vh', display: "flex" }}>
                {type === "User" && <UserHeader name={name} />}
                {type === "Language" && <LanguageHeader type={type} name={name} />}
            </div>
        </div>
    )


}

export default Profile;