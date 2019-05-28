import React, { useCallback } from 'react';
import BackButton from '../../components/BackButton';
import { changeRequest } from '../../redux/RepositoryData/ActionCreators'
import BY from '../../redux/RepositoryData/ByTypes';

const RepositoryBackButton = ({ by, parents, dispatch }) => {
    const clickHandler = useCallback(() => {
        switch (by) {
            case BY.DAYS:
                dispatch(changeRequest(BY.MONTHS, parents.month))
                break;
            case BY.MONTHS:
                dispatch(changeRequest(BY.YEARS, parents.year, parents.year))
                break;
            default:
                break;
        }
    }, [parents, by, dispatch])

    if (by !== BY.YEARS) return <BackButton onClick={clickHandler} />
    return null;
}

export default RepositoryBackButton;