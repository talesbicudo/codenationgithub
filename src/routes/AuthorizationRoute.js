import React from 'react'
import { withRouter } from 'react-router-dom';
import { login, checkValidToken } from '../services/login';
import AuthorizationForm from '../containers/AuthorizationForm';

const AuthorizationRoute = ({ location, history }) => {
    const [warning, setWarning] = React.useState(null);
    const [redirecting, setRedirecting] = React.useState(false);
    const authorize = token => {
        checkValidToken(token)
            .then(token => {
                setRedirecting(true);
                login(token);
            })
            .catch(() => {
                setWarning('Invalid Token');
            })
    }
    if (redirecting) return <p>Redirecting...</p>
    return <AuthorizationForm onSubmit={authorize} warning={warning} />
}

export default withRouter(AuthorizationRoute);