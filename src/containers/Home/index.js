import React from 'react';
import RepositoryList from '../../components/RepositoryList';

const Home = () => (
   <RepositoryList login="andrew" repositoriesPerPage={40} />
)

export default Home;