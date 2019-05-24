import React from 'react';
import useNodeWithId from '../../QueryHooks/useNodeWithId';
import typeMaps from './typeMaps';

const SearchListItem = ({ id, type }) => (
    <div style={{backgroundColor: 'white', width: "30vw", margin: "0", outline: "solid black 0.1rem"}}>
        {useNodeWithId({ id, type, ...typeMaps[type] })}
    </div>
)

export default SearchListItem;
