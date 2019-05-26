import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';

const HomeWithProfile = ({ match }) => {
    const { type, name } = match.params;
    return <Home type={type} name={name} />
}

const AuthenticatedRoute = () => (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/:type/:name' render={HomeWithProfile} />
    </Switch>
)

export default AuthenticatedRoute