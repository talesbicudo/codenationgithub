import ActionTypes from './ActionTypes';
export default (store = {searchText: "", visibility: false, loading: false}, action) => {
   const {type, payload} = action;
   switch(type){
       case ActionTypes.SUCCESS:
            return {...store, visibility: true, loading: false};
       default:
            return store;
   }
}