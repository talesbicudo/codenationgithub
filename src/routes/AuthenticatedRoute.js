import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';

const HomeWithUser = ({ match }) => {
    const user = match.params.user;
    return <Home user={user} />
}

const AuthenticatedRoute = () => (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/:user' render={HomeWithUser} />
    </Switch>
)

export default AuthenticatedRoute