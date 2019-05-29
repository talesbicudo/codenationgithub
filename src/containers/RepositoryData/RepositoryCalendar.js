import React, { useMemo } from 'react';
import { gitIsoDate } from '../../redux/RepositoryData/reducer';
import Box from '@material-ui/core/Box';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { formatDateToPtBr } from '../../helpers';
const RepositoryCalendar = ({ data, dispatch }) => {
    const usableData
        = useMemo(() => {
            const children = data.map(({ interval, total }) => ({
                name: formatDateToPtBr(gitIsoDate(interval.first)),
                value: total
            }));
            return {
                name: "Dias",
                children
            }
        }
            , [data]);


    return (
        <Box display="flex" alignItems="center" height="65vh" width="100%">
            <ResponsiveTreeMap
                root={usableData}
                identity="name"
                value="value"
                innerPadding={3}
                outerPadding={3}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                colors={{ scheme: 'blue_purple' }}
                borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={11}
            />
        </Box>
    )
}

export default RepositoryCalendar;
