import { all, takeLatest, put } from 'redux-saga/effects';
import gql from 'graphql-tag';
import ActionTypes from './ActionTypes';


const query = gql`
        query ($search: String!){
            search(type: REPOSITORY, query: $search first: 1) {
                repositoryCount
            }
        }`

export default function* () {
    yield takeLatest(ActionTypes.REQUEST_ASYNC, handleComplete);
}

function* handleComplete({ type, payload: { client, searchs, by } }) {
    try {
        const rawData = yield all(searchs.map(search => client.query({ query, variables: { search: search.value } })));
        const data = rawData.map((data, i) => {
            return {
                interval: searchs[i].interval,
                total: data.data.search.repositoryCount,
            }
        });
        yield put({ type: ActionTypes.SUCCESS, payload: { data } })
    } catch (error) {
        yield put({ type: ActionTypes.ERROR, payload: { error } })
    }
}
