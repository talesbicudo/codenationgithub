/* Modules */
import { combineReducers } from "redux";

/* Reducers */
import SearchInput from "./SearchList/reducer";

// all the reducers are in one place
const rootReducers = combineReducers({SearchInput});

export default rootReducers;
