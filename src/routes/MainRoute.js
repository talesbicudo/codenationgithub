import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getToken } from '../services/login'
import AuthenticatedRoute from './AuthenticatedRoute';
import AuthorizationRoute from './AuthorizationRoute';

// const token = `Bearer 941a641ace9b12cd7e1d4a46d51f7e1f321c35bd`;
// const client = createClient(token);
//const token = localStorage.getItem('GITHUB_APP_TOKEN');

const MainRoute = () => {
    const token = getToken();
    return (
        <BrowserRouter>
            {token ?
                <AuthenticatedRoute /> :
                <AuthorizationRoute />
            }
        </BrowserRouter>
    )
}

export default MainRoute;