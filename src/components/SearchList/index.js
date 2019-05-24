import React from 'react'
import { Link } from 'react-router-dom';
import SearchListItem from '../SearchListItem';

const SearchList = ({ items, createLink }) => {
    const innerCreateLink = item => createLink(item);
    return (
        <div style={{ position: 'absolute' }}>
            {items.map((item) => {
                return <Link key={item.id} to={innerCreateLink(item)}><SearchListItem key={item.id} {...item} /></Link>
            })}
        </div>
    )
}




export default SearchList;