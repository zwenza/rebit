import { Observable } from 'rxjs/Observable'
import * as ActionTypes from '../constants/ActionTypes'
import 'rxjs';

export const getHeartrate = (action$, store) => action$
  .ofType(ActionTypes.GET_HEART_RATE)
  .switchMap(data => Observable.ajax({
      url: 'https://api.fitbit.com/1/user/' + data.payload.userId + '/activities/heart/date/today/1d.json',
      headers: {
        'Authorization': 'Bearer ' + data.payload.accessToken
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
        data: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_HEART_RATE_FAILURE,
        data: {
          error,
        },
      }
    )),
  );
