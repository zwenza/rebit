import { Observable } from 'rxjs/Observable'
import * as ActionTypes from '../constants/ActionTypes'
import 'rxjs';

export const getHeartrate = (action$, store) => action$
  .ofType(ActionTypes.GET_HEART_RATE)
  .switchMap(data => Observable.ajax({
      url: 'https://api.fitbit.com/1/user/' +  store.getState().auth.user_id + '/activities/heart/date/2016-12-01/' + data.payload.timeFrame + '.json',
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
