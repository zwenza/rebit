import { Observable } from 'rxjs/Observable'
import * as ActionTypes from '../constants/ActionTypes'
import 'rxjs';

export const getHeartrate = action$ => action$
  //TODO change this to correct Action
  .ofType(ActionTypes.STORE_AUTH)
  .switchMap(( { userId } ) => Observable.ajax({
      url: 'https://api.fitbit.com/1/user/4Y7G2M/activities/heart/date/today/1d.json',  //TODO take the userId from the store
      headers: {   //TODO take the access-token from the store
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0WTdHMk0iLCJhdWQiOiIyMjg2Q1MiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNDgyMDgxMDQzLCJpYXQiOjE0ODE0OTE5MTR9.mxvQB05eHJHd9G0K1WoaSF3aGuvNV56sRQeDJGkPfOU'
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
