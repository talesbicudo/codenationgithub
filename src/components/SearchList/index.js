import React from 'react'
import UserSearchListItem from '../SearchListItems/UserSearchListItem';
import LanguageSearchListItem from '../SearchListItems/LanguageSearchListItem';
const SearchListItems = { "language": LanguageSearchListItem, "user": UserSearchListItem };
const SearchList = ({ items }) => {

    return <div>
        {items.map(item => {
            const SearchListItem = SearchListItems[item.type];
            return <SearchListItem key={item.id} id={item.id} />
        })}
    </div>

}

export default SearchList;