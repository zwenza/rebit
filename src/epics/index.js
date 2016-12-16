import { getHeartrate } from './data'
import { combineEpics } from 'redux-observable'

const rootEpic = combineEpics(
  getHeartrate
);

export default rootEpic;
