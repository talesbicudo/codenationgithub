import React from 'react';
import RepositoryList from '../../components/RepositoryList';
import { logout } from '../../services/login';
const Home = () => (
    <div>
        <button onClick={logout}>Logout</button>
        <RepositoryList login="andrew" repositoriesPerPage={5} />
    </div>
)

export default Home;