import SearchInput from './SearchInput/sagas'

/* Effects */
import { fork } from 'redux-saga/effects'



export default function* rootSagas() {
  yield fork(SearchInput);
}
