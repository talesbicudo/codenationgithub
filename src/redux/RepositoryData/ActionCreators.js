import ActionTypes from './ActionTypes';

export const changeRequest = payload => ({
    type: ActionTypes.REQUEST,
    payload
})

export const callSearchs = (searchs, client, by) => ({
    type: ActionTypes.REQUEST_ASYNC,
    payload: { searchs, client, by }
})

export const updateInterval = ([first, last]) => ({
    type: ActionTypes.UPDATE,
    payload: { range: { first, last } }
})