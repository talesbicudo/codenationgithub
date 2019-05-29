import React, { useMemo } from 'react';
import Calendar from '../../components/Calendar';
import { gitIsoDate } from '../../redux/RepositoryData/reducer';
import Box from '@material-ui/core/Box';
const RepositoryCalendar = ({ data, dispatch }) => {
    const usableData
        = useMemo(() => {
            const usable = data.map(({ interval, total }) => ({ day: gitIsoDate(interval.first), value: total }));
            return {
                data: usable,
                from: usable[0].day,
                to: usable[data.length - 1].day
            }
        }, [data]);


    return (
        <Box display="flex" alignItems="center" height="65vh" width="100%">
            <Calendar {...usableData} />
        </Box>
    )
}

export default RepositoryCalendar;
