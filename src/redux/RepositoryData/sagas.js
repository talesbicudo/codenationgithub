import { all, call, takeLatest, put, select } from 'redux-saga/effects';
import gql from 'graphql-tag';
import ActionTypes from './ActionTypes';
import ByTypes from './ByTypes';
import { getParents } from './reducer'
const query = gql`
        query ($search: String!){
            search(type: REPOSITORY, query: $search first: 1) {
                repositoryCount
            }
        }`

export default function* () {
    yield takeLatest(ActionTypes.REQUEST, handleRequest);
    yield takeLatest(ActionTypes.COMPLETE, handleComplete);
}

export function* handleRequest({ type, payload }) {
    const { by } = payload;
    switch (by) {
        case ByTypes.DAYS:
            yield call(dayRequest, payload);
            break;
        case ByTypes.MONTHS:
            yield call(monthRequest, payload);
            break;
        case ByTypes.YEARS:
            yield call(yearRequest, payload);
            break;
        default:
            yield put({ type: ActionTypes.ERRR });
    }
}


const itemSelection = (by, interval) => {
    switch (by) {
        case ByTypes.DAYS:
            return interval.first.getUTCDate();
        case ByTypes.MONTHS:
            return interval.first.getMonth();
        case ByTypes.YEARS:
            return interval.first.getFullYear();
        default:
            return null
    }
}

function* handleComplete({ type, payload: { client, searchs, by } }) {
    const rawData = yield all(searchs.map(search => client.query({ query, variables: { search: search.value } })));
    const data = rawData.map((data, i) => ({
        item: `${itemSelection(by, searchs[i].interval)}`,
        Total: data.data.search.repositoryCount
    }));
    yield put({ type: ActionTypes.SUCCESS, payload: { data } })
}

function* dayRequest({ by, parent, selected }) {
    const parents = yield select(getParents);
    yield put({
        type: ActionTypes.REQUEST_ASYNC, payload: {
            by,
            parents: { ...parents, month: parent },
            selected,
        }
    })
}

function* monthRequest({ by, parent, selected }) {
    const parents = yield select(getParents);
    yield put({
        type: ActionTypes.REQUEST_ASYNC, payload: {
            by,
            selected,
            parents: parent ? { year: parent, month: null } : {...parents, month: null }
        }
    })
}

function* yearRequest({ by, selected }) {
    yield put({
        type: ActionTypes.REQUEST_ASYNC, payload: {
            selected,
            parents: { year: null, month: null },
            by,
        }
    })
}