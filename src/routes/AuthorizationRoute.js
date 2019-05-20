import React from 'react'
import { withRouter } from 'react-router-dom';
import { setToken } from '../client';
import AuthorizationForm from '../containers/AuthorizationForm';

const AuthorizationRoute = ({ location, history }) => {
    const [warning, setWarning] = React.useState(null);
    const [redirecting, setRedirecting] = React.useState(false);
    const authorize = token => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.status === 401) {
                setWarning('Invalid Token');
            } else if (request.status === 205) {
                setRedirecting(true);
                setToken(token);
                window.location.reload();
            }
        }
        request.open('put', "https://api.github.com/notifications", true);
        request.setRequestHeader('Authorization', `token ${token}`);

        request.send();

    }
    if(redirecting) return <p>Redirecting...</p>
    return <AuthorizationForm onSubmit={authorize} warning={warning} />
}

export default withRouter(AuthorizationRoute);