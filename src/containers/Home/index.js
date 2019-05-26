/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import MainSearch from '../MainSearch';
import Profile from '../Profile';
import Nav from '../../components/Nav'

export const Home = ({ type = 'User', name = "" }) => {
    return (
        <div className="home" css={css`
            > * {
                padding: 0 2rem;
                margin-top: 0;
            } 
        `}>
            <Nav className="nav">
                <div className="nav__search" css={css`
                    width: 30vw;    
                `}>
                    <MainSearch initialValue={name} />
                </div>
            </Nav>
            <Profile type={type} name={name} />
        </div>
    )
}




export default Home; 