import React from 'react';
import RepositoryItem from '../RepositoryItem';


function SimpleExpansionPanel({ repositories =[] }) {
    const items = repositories.map((repository, i) =>
        <RepositoryItem data-testid="repositoryItem" key={repository.id+i} {...repository} />
    );

    return (
        <div style={{overflowY: "scroll", position: "relative", width: "100%", height: '50vh'}}>
            {items}
        </div>
    );
}

export default SimpleExpansionPanel;