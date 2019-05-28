import { all, call, takeLatest, put } from 'redux-saga/effects';
import gql from 'graphql-tag';
import ActionTypes from './ActionTypes';
import ByTypes from './ByTypes';
import { gitIsoDate } from './reducer'
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
        case ByTypes.MONTHS:
            return gitIsoDate(interval.first);
        case ByTypes.YEARS:
            return interval.first.getFullYear();
        default:
            return null
    }
}

function* handleComplete({ type, payload: { client, searchs, by } }) {
    const rawData = yield all(searchs.map(search => client.query({ query, variables: { search: search.value } })));
    const data = rawData.map((data, i) => {
        return {
            item: `${itemSelection(by, searchs[i].interval)}`,
            Total: data.data.search.repositoryCount,
            raw: searchs[i]
        }
    });
    yield put({ type: ActionTypes.SUCCESS, payload: { data } })
}


function* monthRequest({ by, selectedYear }) {
    yield put({
        type: ActionTypes.REQUEST_ASYNC, payload: {
            by,
            selectedYear,
        }
    })
}

function* yearRequest({ by }) {
    yield put({
        type: ActionTypes.REQUEST_ASYNC, payload: {
            selectedYear: null,
            by,
        }
    })
}