import React from 'react';


const UserSearchListItem = ({ login = "", avatarUrl = ""}) =>
    <div>
        <p>{login}</p>
        <img src={avatarUrl} alt={login}/>
    </div>


export default UserSearchListItem;