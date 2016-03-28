import { RECEIVE_LOAD_AVERAGE, UPDATE_START_TIME } from '../constants/actionTypes';

export const receiveAverages = (averages) => ({
  type: RECEIVE_LOAD_AVERAGE,
  payload: averages,
});
