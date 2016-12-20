import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
import rootEpic from './epics'
import persistState from 'redux-localstorage'

const epicMiddleware = createEpicMiddleware(rootEpic);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers(
  applyMiddleware(epicMiddleware),
  persistState(), // redux-localstorage
));
