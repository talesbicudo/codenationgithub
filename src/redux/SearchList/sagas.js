import { put, takeLatest, delay } from 'redux-saga/effects';
import ActionTypes from './ActionTypes';

export default function* () {
    yield takeLatest(ActionTypes.CANCEL, handleCancel);
}

export function* handleCancel(action) {
    yield delay(150);
    yield put({ ...action, type: ActionTypes.CANCEL_ASYNC })
}