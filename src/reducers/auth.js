import { STORE_AUTH } from '../constants/ActionTypes'

const initialState = {}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case STORE_AUTH:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}
