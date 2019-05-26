/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { v4, v3, v0 } from '../../styles/colors';
import List from '@material-ui/core/List'
import Box from '@material-ui/core/Box';
import SeachListItem from '../SearchListItem';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        <Box className="seach-li" css={css`
           position: absolute;
           border: ${v4} solid .1rem;
           background-color: ${v0};
           border-radius: 0 0 .3rem 0.3rem;
           box-shadow: .5rem .5rem .6rem -.3rem ${v3};
           z-index: 1;
           overflow: hidden;
        `}>
            {loading && <CircularProgress />}
            <List style={itemsStyle}>
                {items.map((item) =>
                    <SeachListItem onLoaded={() => loadingItemsHandler.next()}
                        key={item.id} createLink={innerCreateLink} {...item} />
                )}
            </List>
        </Box>
    )
}




export default SearchList;