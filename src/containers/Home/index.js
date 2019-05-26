import React from 'react';

import MainSearch from '../MainSearch';
import Profile from '../Profile';
export const Home = ({ type = 'User', name = ""}) => {

    return (
        <React.Fragment>
            <MainSearch initialValue={name} />
            <hr />
            <Profile type={type} name={name} />
        </React.Fragment>
    )
}




export default Home; 