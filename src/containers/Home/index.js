/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { profileRequest } from '../../redux/Profile/actionCreators'
import MainSearch from '../MainSearch';
import Profile from '../Profile';
import Nav from '../../components/Nav'
import Box from '@material-ui/core/Box';
import RepositoryData from '../RepositoryData';

export const Home = ({ dispatch, type = 'User', name = "" }) => {

    useEffect(() => {
        dispatch(profileRequest(name, type));
    }, [name, type, dispatch])

    return (
        <Box className="home" css={css`
            > * {
                padding: 2rem;
            } 
        `}>
            <Nav className="nav">
                <div className="nav__search">
                    <MainSearch initialValue={name} />
                </div>
            </Nav>
            <Profile />
            <RepositoryData />
        </Box>
    )
}


export default connect()(Home); 