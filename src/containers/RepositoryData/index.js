import React, { useContext, useEffect, useMemo, useCallback } from 'react';
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress';
import { changeRequest, callSearchs } from '../../redux/RepositoryData/ActionCreators';
import { connect } from 'react-redux';
import { getDateIntervalsQueries } from '../../redux/RepositoryData/reducer';
import { useApolloClient } from 'react-apollo-hooks';
import BY from '../../redux/RepositoryData/ByTypes';
import RepositoryBars from './RepositoryBars';
import RepositoryBackButton from './RepositoryBackButton';
import Viewer from '../../Contexts/Viewer';
import RepositoryCalendar from './RepositoryCalendar';

export const DataView = ({ name, data, type, by, selectedYear, repositoryLoading, dispatch, range }) => {
    const { login } = useContext(Viewer);

    useEffect(() => {
        dispatch(changeRequest(BY.YEARS));
    }, [name, type, dispatch])

    const client = useApolloClient();

    const searchs = useMemo(() =>
        getDateIntervalsQueries({ name: name || login, type }, { by, selectedYear, range }),
        [name, selectedYear, login, type, by, range])
    const successDispatch = useCallback(() => {
        dispatch(callSearchs(searchs, client, by))
    }, [dispatch, by, searchs, client])


    useEffect(() => {
        successDispatch()
    }, [successDispatch]);


    if (repositoryLoading) return <CircularProgress />
    return <Box style={{ height: '50vh' }}>
        <RepositoryBackButton dispatch={dispatch} by={by} selectedYear={selectedYear} />
        {by === BY.YEARS && <RepositoryBars dispatch={dispatch} data={data} />}
        {by === BY.MONTHS && <RepositoryCalendar dispatch={dispatch} data={data} />}
    </Box>
}

const mapDataToProps = ({ RepositoryData }, { name, type }) => ({
    ...RepositoryData,
    repositoryLoading: RepositoryData.loading,
})

export default connect(mapDataToProps)(DataView);