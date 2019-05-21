import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { isLogged } from '../services/login'
import AuthenticatedRoute from './AuthenticatedRoute';
import AuthorizationRoute from './AuthorizationRoute';

const MainRoute = () => {
    return (
        <BrowserRouter>
            {isLogged() ?
                <AuthenticatedRoute /> :
                <AuthorizationRoute />
            }
        </BrowserRouter>
    )
}

export default MainRoute;