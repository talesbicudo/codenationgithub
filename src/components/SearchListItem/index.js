import React from 'react';
import useNodeWithId from '../../QueryHooks/useNodeWithId';
import typeMaps from './typeMaps';
import MenuItemLink from '../MenuItemLink';

const SearchListItem = ({ id, type, createLink, name, onLoaded }) => {
    const { Component, nodeProps } = typeMaps[type];
    const { loading, error, data } = useNodeWithId({ id, nodeType: type, nodeProps })
    if (loading) return null;
    if (error) return null;
    onLoaded();
    return (
        <MenuItemLink to={createLink({type, name})}>
            <Component {...data.node} />
        </MenuItemLink>
    )
}
export default SearchListItem;
