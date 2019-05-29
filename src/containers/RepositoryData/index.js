import React, { useContext, useEffect, useMemo, useCallback } from 'react';
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress';
import { changeRequest, updateInterval, callSearchs } from '../../redux/RepositoryData/ActionCreators';
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
import YearSlider from './YearSlider';
export const DataView = ({ name, data, type, by, error, selectedMonth, selectedYear, repositoryLoading, dispatch, range }) => {

    const { login } = useContext(Viewer);
    const { enqueueSnackbar } = useSnackbar();

    const payloadDispatch = useCallback((by, selected) => {
        dispatch(changeRequest(dispatchHandler(by, selected)));
    }, [dispatch])

    const intervalDispatch = useCallback((interval) => {
        dispatch(updateInterval(interval))
    }, [dispatch]);

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
        <RepositoryBars by={by} selectedMonth={selectedMonth} range={range} dispatch={payloadDispatch} data={data} /> :
        <RepositoryCalendar data={data} />;

    return <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <h2>Gráficos</h2>
        {repositoryLoading ?
            <CircularProgress style={{marginTop: '25%'}}/> :
            <Box flexGrow="2" width="100%">
                {display}
            </Box>
        }
        {!repositoryLoading && (
            <Box flexGrow="1" width="100%" display="flex">
                {by === BY.YEARS && <YearSlider dispatch={intervalDispatch} range={range} />}
                {by !== BY.YEARS && <RepositoryBackButton by={by} selectedYear={selectedYear} dispatch={payloadDispatch} />}
            </Box>)}
    </Box>
}

const mapDataToProps = ({ RepositoryData }, { name, type }) => ({
    ...RepositoryData,
    repositoryLoading: RepositoryData.loading,
})


export default connect(mapDataToProps)(DataView);