import React, { useCallback } from 'react';
import { changeRequest } from '../../redux/RepositoryData/ActionCreators';
import Bars from '../../components/Bars';
import BY from '../../redux/RepositoryData/ByTypes';

const legends = { [BY.MONTHS]: 'Mês', [BY.YEARS]: "Ano", [BY.DAYS]: "Dia" };

const RepositoryBars = ({ data,  dispatch, by }) => {
    const clickHandler = useCallback(({ data }) => {

        const monthClickHandler = ({ item }) => {
            dispatch(changeRequest(BY.DAYS, 0, +item))
        }

        const yearClickHandler = ({ item }) => {
            dispatch(changeRequest(BY.MONTHS, 0, +item))
        }

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
    }, [by, dispatch])
    return <Bars data={data} onClick={clickHandler} legend={legends[by]} />
}

export default RepositoryBars;