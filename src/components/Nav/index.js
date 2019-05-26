/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { v1 } from '../../styles/colors'

const Nav = ({ color = v1, children }) => <nav css={css`
    height: 4vh;
    background-color: ${color};
    display: flex;
    flex-flow: column;
    justify-content: center;
`}>
    {children}
</nav>

export default Nav;