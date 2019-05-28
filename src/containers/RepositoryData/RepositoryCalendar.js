import React, { useMemo } from 'react';
import Calendar from '../../components/Calendar';

const RepositoryCalendar = ({ data, dispatch }) => {
    const usableData 
        = useMemo(() => ({
            data: data.map(({item, Total}) => ({day: item, value: Total})),
            from: data[0].item,
            to: data[data.length - 1].item
        }), [data]);

    console.log(usableData);
    return <Calendar {...usableData} />
}

export default RepositoryCalendar;
