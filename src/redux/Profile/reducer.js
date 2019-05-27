import ActionTypes from './ActionTypes';
const Profile = (store = { name: '', type: 'User' }, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.REQUEST:
            return payload;
        default:
            return store;
    }
}

export default Profile;
