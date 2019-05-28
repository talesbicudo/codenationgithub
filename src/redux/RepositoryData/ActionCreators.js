import ActionTypes from './ActionTypes';

export const changeRequest = (by, selectedYear) => ({
    type: ActionTypes.REQUEST,
    payload: { by, selectedYear }
})


export const callSearchs = (searchs, client, by) => ({
    type: ActionTypes.COMPLETE,
    payload: { searchs, client, by }
})

export const updateInterval = (first, last, client) => ({
    type: ActionTypes.UPDATE,
    payload: { first, last, client }
})