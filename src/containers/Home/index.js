/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import MainSearch from '../MainSearch';
import Profile from '../Profile';
import Nav from '../../components/Nav'
import Container from '@material-ui/core/Container';

export const Home = ({ type = 'User', name = "" }) => {
    
    return (
        <Container className="home" css={css`
            > * {
                padding: .5rem 2rem;
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
            <Profile type={type} name={name} />
        </Container>
    )
}




export default Home; 