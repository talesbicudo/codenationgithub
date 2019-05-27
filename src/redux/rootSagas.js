import SearchInput from './SearchList/sagas'
import RepositoryData from './RepositoryData/sagas'
/* Effects */
import { fork } from 'redux-saga/effects'



export default function* rootSagas() {
  yield fork(SearchInput);
  yield fork(RepositoryData);
}
