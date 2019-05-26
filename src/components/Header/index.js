/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Header = ({ avatar, name, totalCount }) => (
    <div className='header' css={css`
        display: flex;
        justify-content: left; 
        align-items: center;
        flex-wrap: nowrap;
    `}>
        <div className="header__avatar">
            {avatar}
        </div>
        <div className="header__info">
            <h1>{name}</h1>
            <p>Repositórios: {totalCount}</p>
        </div>
    </div>
)

export default Header;