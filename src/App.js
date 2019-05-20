import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withUserRepositories from './QueryHOCS/withUserRepositories';
import createClient from './client';

const token = `Bearer 941a641ace9b12cd7e1d4a46d51f7e1f321c35bd`;
const client = createClient(token);


const SampleComponent = ({ repositories, onLoadMore, hasNextPage }) => {
  const repositoriesDivs = repositories.map(repository => (
    <div key={repository.id}>
      <h1>{repository.name}</h1>
      <p>Criado em: {repository.createdAt}</p>
    </div>
  ))
  return (
    <div>
      {repositoriesDivs}
      {hasNextPage && <button onClick={onLoadMore}>Mais</button>}
    </div>
  )
}

const RepositoriesSampleComponent = withUserRepositories(SampleComponent);

const App = () => (
  <ApolloProvider client={client}>
    <RepositoriesSampleComponent repositoriesPerPage={50} login={'andrew'} />
  </ApolloProvider>
)

export default App;
