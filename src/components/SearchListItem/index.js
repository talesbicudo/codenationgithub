import React from 'react';
import useNodeWithId from '../../QueryHooks/useNodeWithId';
import typeMaps from './typeMaps';

const SearchListItem = ({ id, type, onLoaded }) => {
    const { Component, nodeProps } = typeMaps[type];
    const { loading, error, data } = useNodeWithId({ id, nodeType: type, nodeProps })
    if (loading) return null;
    if (error) return null;
    onLoaded();
    return (
        <div style={{ backgroundColor: 'white', width: "30vw", margin: "0", outline: "solid black 0.1rem" }}>
            <Component {...data.node} />
        </div>
    )
}
export default SearchListItem;
