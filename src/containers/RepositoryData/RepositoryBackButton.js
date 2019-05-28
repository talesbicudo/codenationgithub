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

    if (by !== BY.YEARS) return <BackButton onClick={clickHandler} />
    return null;
}

export default RepositoryBackButton;