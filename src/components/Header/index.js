import React from 'react'

const Header = ({ avatar, name, totalCount }) => (
    <React.Fragment>
        {avatar}
        <h1>{name}</h1>
        <p>Repositórios: {totalCount}</p>
    </React.Fragment>
)

export default Header;