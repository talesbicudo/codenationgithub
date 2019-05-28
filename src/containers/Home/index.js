/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux'
import MainSearch from '../MainSearch';
import Profile from '../Profile';
import Nav from '../../components/Nav'
import ViewerInfo from '../../components/ViewerInfo';
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
                padding: 0 2rem;
            } `}>
                <Nav className="nav">
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Box width="30%">
                            <MainSearch initialValue={name} />
                        </Box>
                        <ViewerInfo {...viewer} />
                    </Box>
                </Nav>
                <Profile type={type} name={name} />
                <RepositoryData type={type} name={name} />
            </Box>


        </Viewer.Provider>
    )
}


export default connect()(Home); 