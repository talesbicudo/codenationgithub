import React from 'react'
import { Link } from 'react-router-dom';
import SearchListItem from '../SearchListItem';

const SearchList = ({ items, createLink, loading, onLoaded }) => {
    const innerCreateLink = item => createLink(item);

    const loadingItems = function* () {
        for (let i = 0; i < items.length - 1; i++) {
            yield null;
        }
        yield onLoaded();
    }

    const loadingItemsHandler = loadingItems();
    const itemsStyle = loading ? { display: 'none' } : {};
    return (
        <div style={{ position: 'absolute' }}>
            {loading && <p>Loading...</p>}
            <div style={itemsStyle}>
                {items.map((item) => {
                    return <Link key={`link-${item.id}`} to={innerCreateLink(item)}>
                        <SearchListItem onLoaded={() => loadingItemsHandler.next()}
                            key={item.id} {...item} />
                    </Link>
                })}
            </div>
        </div>
    )
}




export default SearchList;