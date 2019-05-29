import {changeRequest, callSearchs, updateInterval} from './ActionCreators';
import ActionTypes from './ActionTypes';

describe("Repository data Action Creators", () => {
    it("Delivery correct actions", () => {
        const payload = {test: "test"}
        const client = jest.fn()
        expect(changeRequest(payload)).toMatchObject({
            type: ActionTypes.REQUEST,
            payload: {test: "test"}
        })
        expect(callSearchs("searchs", client, "YEARS")).toMatchObject({
            type: ActionTypes.REQUEST_ASYNC,
            payload: {searchs: "searchs", client, by: "YEARS"}
        })
        expect(updateInterval([1, 2])).toMatchObject({
            type: ActionTypes.UPDATE,
            payload: {range: {first: 1, last: 2}}
        })
    })
    
})