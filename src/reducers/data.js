import { GET_HEART_RATE_INTRADAY, SET_DATA_TIME_FRAME, GET_HEART_RATE, GET_HEART_RATE_SUCCESS, GET_HEART_RATE_FAILURE } from '../constants/ActionTypes'

const initialState = {}

export default function data(state = initialState, action) {
  switch (action.type) {
    case SET_DATA_TIME_FRAME:
      return Object.assign({}, state, { loading: true }, action.payload);
    case GET_HEART_RATE:
      return Object.assign({}, state, { loading: true });
    case GET_HEART_RATE_INTRADAY:
      return Object.assign({}, state, { loading: true });
    case GET_HEART_RATE_SUCCESS:
      return Object.assign({}, state, action.payload, { loading: false })
    case GET_HEART_RATE_FAILURE:
      //TODO dispatch error action
      return Object.assign({}, state, { loading: false })
    default:
      return state
  }
}
