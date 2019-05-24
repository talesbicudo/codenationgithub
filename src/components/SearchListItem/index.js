import React from 'react';
import useNodeWithId from '../../QueryHooks/useNodeWithId';
import typeMaps from './typeMaps';

const SearchListItem = ({ id, type }) => (
    <div>
        {useNodeWithId({ id, type, ...typeMaps[type] })}
    </div>
)

export default SearchListItem;
