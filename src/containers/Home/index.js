/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { profileRequest } from '../../redux/Profile/actionCreators'
import MainSearch from '../MainSearch';
import Profile from '../Profile';
import Nav from '../../components/Nav'
import Container from '@material-ui/core/Container';

export const Home = ({ dispatch, type = 'User', name = "" }) => {

    useEffect(() => {
        dispatch(profileRequest(name, type));
    }, [name, type, dispatch])

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
            <Profile />
        </Container>
    )
}


export default connect()(Home); 