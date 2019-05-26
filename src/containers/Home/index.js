/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import MainSearch from '../MainSearch';
import Profile from '../Profile';
import Nav from '../../components/Nav'
import { v5, v1 } from '../../styles/colors';
export const Home = ({ type = 'User', name = "" }) => {
    return (
        <div className="home" css={css`
            > * {
                padding: .5rem 2rem;
            } 
            .profile {
                background-color: ${v5};
                color: ${v1};
            }
            .nav__search {
               width: 30vw; 
            }
        `}>
            <Nav className="nav">
                <div className="nav__search">
                    <MainSearch initialValue={name} />
                </div>
            </Nav>
            <Profile className='profile' type={type} name={name} />
        </div>
    )
}




export default Home; 