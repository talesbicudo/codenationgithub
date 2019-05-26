import ActionTypes from './ActionTypes'

export const profileRequest = (name, id) => ({
    type: ActionTypes.REQUEST,
    payload: { name, id }
})