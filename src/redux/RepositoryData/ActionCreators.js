import ActionTypes from './ActionTypes';

export const changeRequest = (by, selected, parent) => ({
    type: ActionTypes.REQUEST,
    payload: { by, parent, selected }
})


export const callSearchs = (searchs, client, by) => ({
    type: ActionTypes.COMPLETE,
    payload: { searchs, client, by }
})

export const updateInterval = (first, last, client) => ({
    type: ActionTypes.UPDATE,
    payload: { first, last, client }
})