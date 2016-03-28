import { Map } from 'immutable';
import { get10SecondInterval } from '../helpers/getInterval';

export const latestRecord = state => state.averages
  .sortBy(record => record.get('recordedAt'))
  .reverse()
  .take(1)
  .toJS()[0];

// Data for the interval graph
export const loadAvgsIn10SecondIntervals = state => state.averages
  // Get the smallest load average period (1 minute) and the 10 second interval
  .map(record => Map({
    amount: record.get('avg1Min'),
    recordedAt: get10SecondInterval(record.get('recordedAt')),
  }))
  // Group each average by its 10 second interval
  .groupBy(record => record.get('recordedAt'))
  // Reduce to the sum of the amounts for this interval and calc the average load
  .map((interval, timestamp) => Map({
    amount: interval.reduce((sum, record) => sum + record.get('amount'), 0) / interval.size,
    recordedAt: timestamp,
  }))
  .toList()
  .toJS();
