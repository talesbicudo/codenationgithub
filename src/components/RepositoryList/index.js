import React from 'react';
import PropTypes from 'prop-types';
import RepositoryItem from '../RepositoryItem';

const RepositoryList = ({ hasNextPage, loadMore, user }) => {
    const items = user.repositories.nodes.map(repository =>
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
    
RepositoryList.propTypes = {
    hasNextPage: PropTypes.bool,
    loadMore: PropTypes.func,
    user: PropTypes.object
}

export default RepositoryList;
