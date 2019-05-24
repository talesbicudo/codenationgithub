import ActionTypes from './ActionTypes';
export default (store = { value: "", visibility: 'hidden', loading: false }, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.REQUEST:
            return { ...store, value: payload.searchText, visibility: 'visible', loading: true };
        case ActionTypes.CANCEL:
            return { ...store, value: payload.searchText, visibility: "hidden", loading: false }
        default:
            return store;
    }
}