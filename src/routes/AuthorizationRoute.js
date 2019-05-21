import React from 'react'
import { withRouter } from 'react-router-dom';
import { login, redirectToGitAuth, isLogged } from '../services/login';

const AuthorizationRoute = ({ location, history }) => {
    const reg = /\?code=(.*)/;
    const match = reg.exec(location.search);
    if (Array.isArray(match)) {
        const code = match[1];
        login(code);
    } else if(!isLogged()) {
        redirectToGitAuth();
    } else {
        window.location.reload();
    }
    return <p>Authorizing...</p>;
}

export default withRouter(AuthorizationRoute);