import 'babel-polyfill';
import test from 'tape';
import { Stack } from 'immutable';
import { put, select } from 'redux-saga/effects';
import { HEALTH_OK, HEALTH_WARNING } from '../../constants/healthStatus';
import { addHealthMessage, updateHealth } from '../../actions';
import { checkHealthStatus } from '../../sagas/systemStatus';
import recordFactory from '../_testHelpers/recordFactory';

const state = {
  systemHealth: HEALTH_OK,
  messages: Stack(),
  averages: [],
};

test('should trigger a warning message when the threshold criteria is met', (t) => {
  t.plan(6);

  const stateWithAlertStatus = {
    ...state,
    averages: Stack([recordFactory(1), recordFactory(1)]),
  };

  const saga = checkHealthStatus();

  const taskSelect = saga.next();
  t.deepEqual(taskSelect.value, select());

  const taskUpdateHealth = saga.next(stateWithAlertStatus);
  t.deepEqual(
    taskUpdateHealth.value,
    put(updateHealth(HEALTH_WARNING)),
    "dispatches action to update the system's health status"
  );

  // Triggers the 'add message' action with an alert message in the payload
  const taskAddMessage = saga.next();
  const msgAction = put(addHealthMessage('', HEALTH_WARNING));

  t.equal(
    taskAddMessage.value.PUT.type,
    msgAction.PUT.type,
    'dispatches ADD_HEALTH_MESSAGE action'
  );
  t.equal(
    taskAddMessage.value.PUT.payload.status,
    msgAction.PUT.payload.status,
    'message status is HEALTH_WARNING'
  );
  t.ok(
    taskAddMessage.value.PUT.payload.text.startsWith('High load generated an alert'),
    'message text matches the alert message content'
  );

  // Generator should be done.
  const lastTask = saga.next();
  t.ok(lastTask.done);
});

test('should NOT update the system health if the status is unchanged', (t) => {
  t.plan(2);

  const stateWithOkStatus = {
    ...state,
    averages: Stack([recordFactory(1), recordFactory(0.8)]),
  };

  const saga = checkHealthStatus();

  const taskSelect = saga.next();
  t.deepEqual(taskSelect.value, select());

  // Generator should exit early since the status hasn't changed.
  const lastTask = saga.next(stateWithOkStatus);
  t.ok(lastTask.done);
});
