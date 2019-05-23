import React from 'react'

const SearchList = ({ items, loadMore }) => {
    React.useEffect(() => {
        loadMore()
    }, [loadMore])
    return <div>
        {items.map(node => <p>{node.id}</p>)}
    </div>

}

export default SearchList;