import React from 'react';
import RepositoryList from '../../components/RepositoryList';
const Home = () => (
    <div>
        <RepositoryList
            login="" //Nome do user, se estiver vazio retorna próprio usuário autorizado
            repositoriesPerPage={5}
            onLoading={() => console.log('loading')}
            onError={error => console.log(error)}
            LoadingComponent={() => 'loading...'}
            ErrorComponent={({error}) => <p>{error.message}</p>}
        />
    </div>
)

export default Home;