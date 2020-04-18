import {takeLatest} from 'redux-saga/effects';
import { addData } from './home-view.saga';
import constants from '../constants';

export default function* homeViewSagas() {
  yield takeLatest(constants.ADD_DATA, addData);
}
