import { fork } from 'redux-saga/effects';
import pollStats from './pollStats';
import systemStatus from './systemStatus';

export default function* sagas() {
  yield fork(pollStats);
  yield fork(systemStatus);
}
