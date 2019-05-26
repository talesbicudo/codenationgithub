/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { v0 } from '../../styles/colors'

const Nav = ({ color = v0, children }) => <nav css={css`
    background-color: ${color};
    display: flex;
    justify-content: space-between;
    align-items: center;
`}>
    {children}
</nav>

export default Nav;