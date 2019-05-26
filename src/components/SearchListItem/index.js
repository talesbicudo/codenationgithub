import React from 'react';
import useNodeWithId from '../../QueryHooks/useNodeWithId';
import typeMaps from './typeMaps';
import ListItemLink from '../ListItemLink';

const SearchListItem = ({ id, type, createLink, name, onLoaded }) => {
    const { Component, nodeProps } = typeMaps[type];
    const { loading, error, data } = useNodeWithId({ id, nodeType: type, nodeProps })
    if (loading) return null;
    if (error) return null;
    onLoaded();
    return (
        <ListItemLink to={createLink({type, name})}>
            <Component {...data.node} />
        </ListItemLink>
    )
}
export default SearchListItem;
