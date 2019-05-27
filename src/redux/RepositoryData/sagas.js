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
}

export function* handleRequest({ type, payload }) {
    const { by, searchs, client } = payload;
    const rawData = yield all(searchs.map(search => client.query({ query, variables: { search: search.value } })));
    const data = rawData.map((data, i) => ({ interval: searchs[i].interval, Total: data.data.search.repositoryCount }));
    switch (by) {
        case ByTypes.DAYS:
            yield call(dayRequest, data, payload);
            break;
        case ByTypes.MONTHS:
            yield call(monthRequest, data, payload);
            break;
        case ByTypes.YEARS:
            yield call(yearRequest, data, payload);
            break;
        default:
            yield put({ type: ActionTypes.Error });
    }
}

function* dayRequest(data, { by, parent, selected }) {
    const parents = yield select(getParents);
    yield put({
        type: ActionTypes.SUCCESS, payload: {
            by,
            parents: { ...parents, month: parent },
            data,
            selected,
        }
    })
}

function* monthRequest(data, { by, parent, selected }) {
    const parents = yield select(getParents);
    yield put({
        type: ActionTypes.SUCCESS, payload: {
            data,
            by,
            selected,
            parents: parent ? { year: parent, month: null } : { year: parents.year, month: null }
        }
    })
}

function* yearRequest(intervalData, { by, selected }) {
    const data = intervalData.map(data => ({ ...data, item: data.interval.first.getFullYear().toString() }))
    yield put({
        type: ActionTypes.SUCCESS, payload: {
            selected,
            parents: { year: null, month: null },
            by,
            data
        }
    })
}