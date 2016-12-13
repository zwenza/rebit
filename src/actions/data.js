import * as types from '../constants/ActionTypes';

export const fetchHeartRateData = (userId, accessToken) => ({ type: types.GET_HEART_RATE, payload: { userId: userId, accessToken: accessToken } })
