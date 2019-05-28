/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux'
import MainSearch from '../MainSearch';
import Profile from '../Profile';
import Nav from '../../components/Nav'
import Box from '@material-ui/core/Box';
import RepositoryData from '../RepositoryData';
import useViewer from '../../QueryHooks/useViewer';
import Viewer from '../../Contexts/Viewer';

export const Home = ({ dispatch, type = 'User', name = "" }) => {
    const { loading, viewer } = useViewer();
    if (loading) return null

    return (
        <Viewer.Provider value={viewer}>
            <Box className="home" css={css`
            > * {
                padding: 2rem;
            } `}>
                <Nav className="nav">
                    <div className="nav__search">
                        <MainSearch initialValue={name} />
                    </div>
                </Nav>
                <Profile type={type} name={name} />
                <RepositoryData type={type} name={name} />
            </Box>


        </Viewer.Provider>
    )
}


export default connect()(Home); 