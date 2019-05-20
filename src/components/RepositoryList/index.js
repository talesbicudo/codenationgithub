import React from 'react';
import withUserRepositories from '../../QueryHOCS/withUserRepositories';
import RepositoryItem from '../RepositoryItem';

const RepositoryList = ({ repositories, loadMore, hasNextPage }) => {
    const repositoriesDivs = repositories.map(repository =>
        <RepositoryItem key={repository.id} {...repository} />)
    return (
        <div>
            {repositoriesDivs}
            {hasNextPage && <button onClick={loadMore}>Mais</button>}
        </div>
    )
}

export default withUserRepositories(RepositoryList);