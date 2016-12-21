import * as types from '../constants/ActionTypes';

export const fetchHeartRateData = (userId, accessToken, timeFrame) => ({ type: types.GET_HEART_RATE, payload: { userId, accessToken, timeFrame } })
export const setDataTimeFrame = dataTimeFrame => ({ type: types.SET_DATA_TIME_FRAME, payload: { dataTimeFrame }})
