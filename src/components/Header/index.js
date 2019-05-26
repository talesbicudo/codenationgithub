import React from 'react';
import Box from '@material-ui/core/Box';

const Header = ({ avatar, name, totalCount }) => (
    <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Box className="header__avatar">
            {avatar}
        </Box>
        <Box className="header__info">
            <h1>{name}</h1>
            <p>Repositórios: {totalCount}</p>
        </Box>
    </Box>
)

export default Header;