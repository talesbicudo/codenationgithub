/* Modules */
import { combineReducers } from "redux";

/* Reducers */
import SearchList from "./SearchList/reducer";
import Profile from "./Profile/reducer"
import RepositoryData from './RepositoryData/reducer';

// all the reducers are in one place



const rootReducers = combineReducers({ SearchList, Profile, RepositoryData });

export default rootReducers;
