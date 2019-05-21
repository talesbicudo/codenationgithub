import React from 'react';
import RepositoryList from '../../components/RepositoryList';
const Home = () => (
    <div>
        <RepositoryList login=";asdlkfjasdf" repositoriesPerPage={5}
            onLoading={() => console.log('loading')}
            onError={error => console.log(error)}
        />
    </div>
)

export default Home;