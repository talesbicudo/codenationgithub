import React from 'react'
import { Redirect, withRouter } from 'react-router-dom';
import { getUrlParameter } from '../helpers';
import { setToken, authorizationRedirect } from '../client';

const AuthorizationRoute = ({ location }) => {
    const regex = /code=/;
    if (regex.test(location.search)) {
        setToken(getUrlParameter('code'));
        return <Redirect to='/' />
    } else {
        authorizationRedirect();
        return null;
    }

}

export default withRouter(AuthorizationRoute);