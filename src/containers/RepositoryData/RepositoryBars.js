import React, { useCallback } from 'react';
import Bars from '../../components/Bars';
import BY from '../../redux/RepositoryData/ByTypes';

const legends = { [BY.MONTHS]: "Mês", [BY.YEARS]: "Ano" }

const RepositoryBars = ({ data, by, dispatch }) => {
    const clickHandler = useCallback(({ data }) => {
        switch (by) {
            case BY.YEARS:
                dispatch(BY.MONTHS, +data.item)
                break;
            case BY.MONTHS:
                dispatch(BY.DAYS, data.i)
                break;
            default:
                break;
        }
    }, [dispatch, by])
    return <Bars data={data} onClick={clickHandler} legend={legends[by]} />
}

export default RepositoryBars;