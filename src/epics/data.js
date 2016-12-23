import { Observable } from 'rxjs/Observable'
import * as ActionTypes from '../constants/ActionTypes'
import 'rxjs';

export const getHeartrate = (action$, store) => action$
  .ofType(ActionTypes.GET_HEART_RATE)
  .switchMap(data => Observable.ajax({
      url: 'https://api.fitbit.com/1/user/' +  store.getState().auth.user_id + '/activities/heart/date/' + data.payload.timeFrame[0] + '/' + data.payload.timeFrame[1] + '.json',
      headers: {
        'Authorization': 'Bearer ' + store.getState().auth.access_token
      },
      crossDomain: true,
      method: 'GET',
      createXHR: function () {
        return new XMLHttpRequest();
      }
  }).map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.GET_HEART_RATE_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_HEART_RATE_FAILURE,
        payload: {
          error,
        },
      }
    )),
  );


export const getHeartrateIntraDay = (action$, store) => action$
  .ofType(ActionTypes.GET_HEART_RATE_INTRADAY)
  .switchMap(data => Observable.ajax({
      url: 'https://api.fitbit.com/1/user/' +  store.getState().auth.user_id + '/activities/heart/date/' + data.payload.timeFrame[0] + '/' + data.payload.timeFrame[1] + '/1min' + '.json',
      headers: {
        'Authorization': 'Bearer ' + store.getState().auth.access_token
      },
      crossDomain: true,
      method: 'GET',
      createXHR: function () {
        return new XMLHttpRequest();
      }
  }).map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.GET_HEART_RATE_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_HEART_RATE_FAILURE,
        payload: {
          error,
        },
      }
    )),
  );
