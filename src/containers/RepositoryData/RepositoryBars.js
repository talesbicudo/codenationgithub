import React, { useCallback } from 'react';
import { changeRequest } from '../../redux/RepositoryData/ActionCreators';
import Bars from '../../components/Bars';
import BY from '../../redux/RepositoryData/ByTypes';


const RepositoryBars = ({ data, dispatch }) => {
    const clickHandler = useCallback(({ data }) => {
        dispatch(changeRequest(BY.MONTHS, +data.item))
    }, [dispatch])
    return <Bars data={data} onClick={clickHandler} legend={"Ano"} />
}

export default RepositoryBars;