import ActionTypes from './ActionTypes';
const Profile = (store = { id: null }, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.REQUEST:
            return { ...store, id: payload.id }
        default:
            return store;
    }
}

export default Profile;
