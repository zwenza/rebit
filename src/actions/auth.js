import * as types from '../constants/ActionTypes';

export const storeAuthData = authData => ({ type: types.STORE_AUTH, data: authData })
