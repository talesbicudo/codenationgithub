import ActionTypes from './ActionTypes';

export const searchListRequest = searchText => ({
    type: ActionTypes.REQUEST,
    payload: { searchText }
})

export const searchListCancel = searchText => ({
    type: ActionTypes.CANCEL,
    payload: { searchText }
})