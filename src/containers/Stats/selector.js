import { createSelector } from 'reselect';
import { latestRecord } from '../../selectors';

const round = num => Math.round(num * 100) / 100;

export default createSelector(
  latestRecord,
  (record) => {
    const loadAverages = record ? {
      avg1Min: round(record.avg1Min),
      avg5Min: round(record.avg5Min),
      avg15Min: round(record.avg15Min),
    } : {};

    return loadAverages;
  }
);
