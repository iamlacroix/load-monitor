import { Map, Stack } from 'immutable';
import { RECEIVE_LOAD_AVERAGE } from '../constants/actionTypes';

const HISTORY_LIMIT = 1200; // Every 1 second for 10 mins (doubled)

export default (state = Stack(), action) => {
  switch (action.type) {
    case RECEIVE_LOAD_AVERAGE:
      // We'll be sending `null` if the API request failed, and don't want to record it.
      if (action.payload) {
        return state.unshift(Map(action.payload)).slice(0, HISTORY_LIMIT);
      }
      return state;
    default:
      return state;
  }
};
