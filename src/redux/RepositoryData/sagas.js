import { all, takeLatest, put } from 'redux-saga/effects';
import gql from 'graphql-tag';
import ActionTypes from './ActionTypes';
import ByTypes from './ByTypes';
import { gitIsoDate } from './reducer'

const months = ["jan.", "fev.", "mar.", "abr.", "maio", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez"];

const query = gql`
        query ($search: String!){
            search(type: REPOSITORY, query: $search first: 1) {
                repositoryCount
            }
        }`

export default function* () {
    yield takeLatest(ActionTypes.REQUEST_ASYNC, handleComplete);
}


const itemSelection = (by, interval, i) => {
    switch (by) {
        case ByTypes.MONTHS:
            return months[i];
        case ByTypes.YEARS:
            return interval.first.getFullYear();
        case ByTypes.DAYS:
            return gitIsoDate(interval.first)
        default:
            return null
    }
}

function* handleComplete({ type, payload: { client, searchs, by } }) {
    try {
        const rawData = yield all(searchs.map(search => client.query({ query, variables: { search: search.value } })));
        const data = rawData.map((data, i) => {
            return {
                item: `${itemSelection(by, searchs[i].interval, i)}`,
                Total: data.data.search.repositoryCount,
                i
            }
        });
        yield put({ type: ActionTypes.SUCCESS, payload: { data } })
    } catch (error) {
        yield put({ type: ActionTypes.ERROR, payload: { error } })
    }
}
