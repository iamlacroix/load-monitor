import test from 'tape';
import { Stack } from 'immutable';
import { HEALTH_OK, HEALTH_WARNING } from '../../constants/healthStatus';
import calcSystemHealth from '../../lib/calcHealth';
import recordFactory from '../_testHelpers/recordFactory';

test('returns the warning status when load average is 1 or higher', (t) => {
  t.plan(2);

  const records = Stack([
    recordFactory(1),
    recordFactory(1),
  ]);

  const [status, load] = calcSystemHealth(records);

  t.equal(status, HEALTH_WARNING);
  t.equal(load, 1);
});

test('returns the ok status when load average is less than 1', (t) => {
  t.plan(2);

  const records = Stack([
    recordFactory(1),
    recordFactory(0.95),
  ]);

  const [status, load] = calcSystemHealth(records);

  t.equal(status, HEALTH_OK);
  t.equal(load, 0.975);
});

test('ignores records older than 2 minutes', (t) => {
  t.plan(1);

  const justOverTwoMinsAgo = Date.now() - 2 * 60 * 1000 - 1;
  const records = Stack([
    recordFactory(1),
    recordFactory(2),
    // The following record will be ignored
    recordFactory(12, justOverTwoMinsAgo),
  ]);

  const [, load] = calcSystemHealth(records);

  t.equal(load, 1.5);
});

test('requires at least 2 records before calculating', (t) => {
  // The initial state of OK will return if there are only 0 or 1 record
  t.plan(2);

  const records = Stack([
    recordFactory(12),
  ]);

  const [status, load] = calcSystemHealth(records);

  t.equal(status, HEALTH_OK);
  t.equal(load, 12);
});
