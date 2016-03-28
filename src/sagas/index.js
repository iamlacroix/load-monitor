import { call, fork, put } from 'redux-saga/effects';
import fetchAverages from '../api/fetchAverages';
import { receiveAverages } from '../actions';

const waitFor = (milliseconds) => new Promise(resolve => setTimeout(() => resolve(), milliseconds));

function* pollLoadAverage() {
  try {
    const averages = yield call(fetchAverages);
    yield put(receiveAverages(averages));
  } catch (error) {
    yield put(receiveAverages(null));
  }
}

function* pollInterval() {
  while (true) {
    yield call(waitFor, 2000); // Every 2 seconds
    yield fork(pollLoadAverage);
  }
}

export default function* sagas() {
  yield fork(pollInterval);
}
