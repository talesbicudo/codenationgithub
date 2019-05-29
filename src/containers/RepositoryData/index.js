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
import { useSnackbar } from 'notistack';
import dispatchHandler from './dispatchHandler';

export const DataView = ({ name, data, type, by, error, selectedMonth, selectedYear, repositoryLoading, dispatch, range }) => {

    const { login } = useContext(Viewer);
    const { enqueueSnackbar } = useSnackbar();

    const payloadDispatch = useCallback((by, selected) => {
        dispatch(changeRequest(dispatchHandler(by, selected)));
    }, [dispatch])

    useEffect(() => {
        payloadDispatch(BY.YEARS);
    }, [name, type, dispatch, payloadDispatch])

    const client = useApolloClient();

    const searchs = useMemo(() =>
        getDateIntervalsQueries({ name: name || login, type }, { by, selectedYear, selectedMonth, range }),
        [name, selectedYear, login, type, by, range, selectedMonth])

    useEffect(() => {
        dispatch(callSearchs(searchs, client, by))
    }, [searchs, client, by, dispatch]);



    if (error) {
        enqueueSnackbar(error);
    }
    const display = by !== BY.DAYS ?
        <RepositoryBars by={by} selectedMonth={selectedMonth} dispatch={payloadDispatch} data={data} /> :
        <RepositoryCalendar data={data} />;

    return <Box height="65vh" display="flex" alignItems="center" justifyContent="center" width="50%" flexGrow="1">
        {repositoryLoading ?
            <CircularProgress /> :
            display
        }
        {!repositoryLoading && <RepositoryBackButton by={by} selectedYear={selectedYear} dispatch={payloadDispatch} />}
    </Box>
}

const mapDataToProps = ({ RepositoryData }, { name, type }) => ({
    ...RepositoryData,
    repositoryLoading: RepositoryData.loading,
})

export default connect(mapDataToProps)(DataView);