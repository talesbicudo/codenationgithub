/* Modules */
import { combineReducers } from "redux";

/* Reducers */
import SearchList from "./SearchList/reducer";

// all the reducers are in one place
const rootReducers = combineReducers({SearchList});

export default rootReducers;
