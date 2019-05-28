/* Modules */
import { combineReducers } from "redux";

/* Reducers */
import SearchList from "./SearchList/reducer";
import RepositoryData from './RepositoryData/reducer';

// all the reducers are in one place



const rootReducers = combineReducers({ SearchList, RepositoryData });

export default rootReducers;
