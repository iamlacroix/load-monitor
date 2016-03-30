import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { addHealthMessage, updateHealth } from '../actions';
import { RECEIVE_LOAD_AVERAGE } from '../constants/actionTypes';
import { HEALTH_OK } from '../constants/healthStatus';
import calcSystemHealth from '../lib/calcHealth';

const round = num => Math.round(num * 10000) / 10000;
const getTime = (date = new Date()) => date.toTimeString();

const createWarningMessage = value =>
  `High load generated an alert - load = ${round(value)}, triggered at ${getTime()}`;
const createOkMessage = () =>
  `Load returned to normal at ${getTime()}`;

export function* checkHealthStatus() {
  const { averages, systemHealth: currentStatus } = yield select();
  const [newStatus, loadValue] = calcSystemHealth(averages);

  // No change
  if (newStatus === currentStatus) {
    return;
  }

  // Update the system's status
  yield put(updateHealth(newStatus));

  // Log a message to the user, alerting them of the status change.
  const msg = newStatus === HEALTH_OK ? createOkMessage() : createWarningMessage(loadValue);
  yield put(addHealthMessage(msg, newStatus));
}

export default function* saga() {
  yield* takeEvery(RECEIVE_LOAD_AVERAGE, checkHealthStatus);
}
