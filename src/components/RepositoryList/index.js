import React from 'react';

import RepositoryItem from '../RepositoryItem';


function SimpleExpansionPanel({ repositories }) {
    const items = repositories.map(repository =>
        <RepositoryItem key={repository.id} {...repository} />
    );

    return (
        <div>
            {items}
        </div>
    );
}

export default SimpleExpansionPanel;