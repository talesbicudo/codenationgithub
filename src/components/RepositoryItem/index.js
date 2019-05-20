import React from 'react';

const RepositoryItem = ({ name, createdAt }) => (
    <div>
        <h1>{name}</h1>
        <p>Criado em: {createdAt}</p>
    </div>
)

export default RepositoryItem