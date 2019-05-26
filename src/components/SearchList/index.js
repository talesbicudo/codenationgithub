/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import SearchListItem from '../SearchListItem';
import { v4, v3 } from '../../styles/colors';

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
    if (!items.length) return null;
    return (
        <div className="seach-list" css={css`
           position: absolute;
           border: ${v4} solid .1rem;
           border-radius: 0 0 .3rem 0.3rem;
           box-shadow: .5rem .5rem .6rem -.3rem ${v3};
           overflow: hidden;
        `}>
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