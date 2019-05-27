import ActionTypes from './ActionTypes';


export const changeRequest = (by, selected, parent, searchs, client) => ({
    type: ActionTypes.REQUEST,
    payload: { searchs, client, by, parent, selected }
})

export const updateInterval = (first, last, client) => ({
    type: ActionTypes.UPDATE,
    payload: { first, last, client }
})