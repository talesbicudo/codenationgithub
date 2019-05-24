import React from 'react';


const UserSearchListItem = ({ login = "", avatarUrl = ""}) =>
    <div>
        <p>{login}</p>
        <img style={{maxHeight: "5rem"}}src={avatarUrl} alt={login}/>
    </div>


export default UserSearchListItem;