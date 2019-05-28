import React, { useCallback, useMemo } from 'react';
import Bars from '../../components/Bars';
import BY from '../../redux/RepositoryData/ByTypes';

const legends = { [BY.MONTHS]: "Mês", [BY.YEARS]: "Ano" }
const months = ["jan.", "fev.", "mar.", "abr.", "maio", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez"];

const RepositoryBars = ({ data, by, dispatch }) => {
    const usableData = useMemo(() => {
        if (by === BY.MONTHS) {
            return data.map(({ total }, i) => ({index: i, item: months[i], Total: +total }))
        }
        return data.map(({ interval, total }) => ({ item: "" + interval.first.getFullYear(), Total: +total }))
    },[data, by])

    const clickHandler = useCallback(({ data }) => {
        switch (by) {
            case BY.YEARS:
                dispatch(BY.MONTHS, +data.item)
                break;
            case BY.MONTHS:
                dispatch(BY.DAYS, data.index)
                break;
            default:
                break;
        }
    }, [dispatch, by])
    return <Bars data={usableData} onClick={clickHandler} legend={legends[by]} />
}

export default RepositoryBars;