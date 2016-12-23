import * as types from '../constants/ActionTypes';

export const fetchHeartRateData = timeFrame => ({ type: types.GET_HEART_RATE, payload: { timeFrame } })
export const fetchHeartRateIntraDayData = timeFrame => ({ type: types.GET_HEART_RATE_INTRADAY, payload: { timeFrame } })
export const setDataTimeFrame = dataTimeFrame => ({ type: types.SET_DATA_TIME_FRAME, payload: { dataTimeFrame }})
