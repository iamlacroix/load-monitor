import { createSelector } from 'reselect';
import { chronologicalMessages } from '../../selectors';

export default createSelector(
  chronologicalMessages,
  (messages) => ({ messages })
);
