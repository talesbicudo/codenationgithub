import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box'
import { changeRequest } from '../../redux/RepositoryData/ActionCreators';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { getDateIntervalsQueries } from '../../redux/RepositoryData/reducer';
import { useApolloClient } from 'react-apollo-hooks';
import RepositoryBars from '../../components/RepositoryBars';
import BY from '../../redux/RepositoryData/ByTypes';

export const DataView = ({ name, data, type, by, selected, repositoryLoading, searchs, dispatch }) => {
    const client = useApolloClient();
    useEffect(() => {
        if (name && type) {
            dispatch(changeRequest(by, selected, null, searchs, client))
        }
    }, [name, type]);

    const clickHandler = ({data}) => {
        switch (by) {
            case BY.DAYS:
                return null;
            case BY.MONTHS:
                return monthClickHandler(data);
            case BY.YEARS:
                return yearClickHandler(data);
            default:
                return null;
        }
    }

    const monthClickHandler = ({item}) => {
        return null;
    }

    const yearClickHandler = ({item}) => {
    }

    if (repositoryLoading) return <CircularProgress />
    return <Box style={{ height: '50vh' }}>
        <RepositoryBars data={data} onClick={clickHandler} legend={'Ano'} />
    </Box>
}

const mapDataToProps = ({ Profile, RepositoryData }) => ({
    ...RepositoryData,
    ...Profile,
    repositoryLoading: RepositoryData.loading,
    searchs: getDateIntervalsQueries(Profile, RepositoryData),
})

export default connect(mapDataToProps)(DataView);