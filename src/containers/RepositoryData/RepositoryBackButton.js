import React, { useCallback } from 'react';
import BackButton from '../../components/BackButton';
import BY from '../../redux/RepositoryData/ByTypes';

const RepositoryBackButton = ({ by, selectedYear, dispatch }) => {
    const clickHandler = useCallback(() => {
        switch (by) {
            case BY.MONTHS:
                dispatch(BY.YEARS, selectedYear)
                break;
            case BY.DAYS:
                dispatch(BY.MONTHS);
                break;
            default:
                break;
        }
    }, [selectedYear, by, dispatch])

    return <BackButton onClick={clickHandler} />
}

export default RepositoryBackButton;