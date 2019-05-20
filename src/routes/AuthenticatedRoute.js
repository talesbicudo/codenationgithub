import React from 'react';
import { Route } from 'react-router-dom';
import  Home  from '../containers/Home';

const AuthenticatedRoute = () => (
    <Route path='/' exact component={Home} />
)

export default AuthenticatedRoute