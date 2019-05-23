import React from 'react';
import RepositoryItem from '../RepositoryItem';

const RepositoryList = ({ login, repositoriesPerPage, hasNextPage, loadMore, user, repositories }) => {
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

export default RepositoryList;