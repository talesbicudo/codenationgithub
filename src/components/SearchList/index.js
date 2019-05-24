import React from 'react'
import { Link } from 'react-router-dom';
import SearchListItem from '../SearchListItem';

const SearchList = ({ items, createLink, onLoaded }) => {
    const innerCreateLink = item => createLink(item);

    const loadingItems = function*() {
        for(let i = 0; i < items.length - 1; i++){
            yield null;
        }
        yield onLoaded();
    }

    const loadingItemsHandler = loadingItems();
    return (
        <div style={{ position: 'absolute' }}>
            {items.map((item) => {
                return <Link key={item.id} to={innerCreateLink(item)}>
                    <SearchListItem onLoaded={() => loadingItemsHandler.next()}
                        key={item.id} {...item} />
                </Link>
            })}
        </div>
    )
}




export default SearchList;