import { SIGN_IN } from '../constants/ActionTypes'

const initialState = [
  {}
]

export default function users(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return state
    default:
      return state
  }
}
