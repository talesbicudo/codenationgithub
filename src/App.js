import React from 'react';
import withUserRepositories from './QueryHOCS/withUserRepositories';
import MainRoute from './routes/MainRoute'

const SampleComponent = ({ repositories, loadMore, hasNextPage }) => {
  const repositoriesDivs = repositories.map(repository => (
    <div key={repository.id}>
      <h1>{repository.name}</h1>
      <p>Criado em: {repository.createdAt}</p>
    </div>
  ))
  return (
    <div>
      {repositoriesDivs}
      {hasNextPage && <button onClick={loadMore}>Mais</button>}
    </div>
  )
}

const RepositoriesSampleComponent = withUserRepositories(SampleComponent);

const App = () => (
  <MainRoute />
)

export default App;
