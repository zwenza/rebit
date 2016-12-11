import { getHeartrate } from './heartrate'
import { combineEpics } from 'redux-observable'

const rootEpic = combineEpics(
  getHeartrate
);

export default rootEpic;
