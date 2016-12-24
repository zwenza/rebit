import { getHeartrate, getHeartrateIntraDay } from './data'
import { combineEpics } from 'redux-observable'

const rootEpic = combineEpics(
  getHeartrate,
  getHeartrateIntraDay
);

export default rootEpic;
