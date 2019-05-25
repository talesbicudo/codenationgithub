import React from 'react';

import MainSearch from '../MainSearch';
import Profile from '../Profile';
export const Home = ({ user }) => {

    return (
        <React.Fragment>
            <MainSearch initialValue={user} />
            <hr />
            <Profile name={user} />
        </React.Fragment>
    )
}




export default Home; 