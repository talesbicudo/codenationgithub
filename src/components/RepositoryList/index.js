import React from 'react';
import withUserRepositories from '../../QueryHOCS/withUserRepositories';
import RepositoryItem from '../RepositoryItem';

const RepositoryList = ({ user, repositories, loadMore, hasNextPage }) => {
    const items = repositories.map(repository =>
        <RepositoryItem key={repository.id} {...repository} />)
    return (
        <div>
            <h1>Usuário: {user.login} </h1>
            <div>
                <h2>Repositórios (total: {user.repositories.totalCount})</h2>
                {items}
            </div>
            {hasNextPage && <button onClick={loadMore}>Mais</button>}
        </div>
    )
}

export default withUserRepositories(RepositoryList);