import React from 'react';
import PropTypes from 'prop-types';

const RepositoryItem = ({ name, createdAt }) => (
    <div>
        <h1>{name}</h1>
        <p>Criado em: {createdAt}</p>
    </div>
)

RepositoryItem.propTypes = {
    name: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date)
}

export default RepositoryItem
