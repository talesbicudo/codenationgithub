import React from 'react'
import UserSearchListItem from '../SearchListItems/UserSearchListItem';
import LanguageSearchListItem from '../SearchListItems/LanguageSearchListItem';
import SearchListItem from '../SearchListItems/SearchListItem';

const SearchList = ({ items }) => (
    <div>
        {items.map((item) => {
            return <SearchListItem key={item.id} {...item} />
        })}
    </div>
)



export default SearchList;