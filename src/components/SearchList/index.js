import React from 'react'
import SearchListItem from '../SearchListItem';

const SearchList = ({ items }) => (
    <div>
        {items.map((item) => {
            return <SearchListItem key={item.id} {...item} />
        })}
    </div>
)



export default SearchList;