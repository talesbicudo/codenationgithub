import ActionTypes from './ActionTypes'

export const profileRequest = (name, type) => ({
    type: ActionTypes.REQUEST,
    payload: { name, type }
})