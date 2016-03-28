import { createSelector } from 'reselect';
import { loadAvgsIn10SecondIntervals } from '../../selectors';

export default createSelector(
  loadAvgsIn10SecondIntervals,
  (averages) => ({
    averages,
  })
);
