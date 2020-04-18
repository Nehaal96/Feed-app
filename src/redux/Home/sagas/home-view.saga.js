import { put } from 'redux-saga/effects';
import {
    addDataSuccess,
    addDataFailure
  } from '../actions/home-view.actions';

export function* addData(action) {
    const {data} = action;
    try {
      console.log('addData saga', data)
      yield put(addDataSuccess(data));
    } catch (error) {
      yield put(addDataFailure(error));
    }
}
