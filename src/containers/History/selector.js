import { createSelector } from 'reselect';
import {
  browserWidth as browserWidthSelector,
  loadAvgsIn10SecondIntervals,
} from '../../selectors';

export default createSelector(
  browserWidthSelector,
  loadAvgsIn10SecondIntervals,
  (browserWidth, averages) => ({
    browserWidth,
    averages,
  })
);
