import { GET_HEART_RATE_SUCCESS, GET_HEART_RATE_FAILURE } from '../constants/ActionTypes'

const initialState = {}

export default function data(state = initialState, action) {
  switch (action.type) {
    case GET_HEART_RATE_SUCCESS:
      return Object.assign({}, state, action.data)
    case GET_HEART_RATE_FAILURE:
      //TODO dispatch error action
      return state
    default:
      return state
  }
}
