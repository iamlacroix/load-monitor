import { Map, Stack } from 'immutable';
import { ADD_HEALTH_MESSAGE } from '../constants/actionTypes';

export default (state = Stack(), action) => {
  switch (action.type) {
    case ADD_HEALTH_MESSAGE:
      return state.unshift(Map({
        id: action.payload.id,
        text: action.payload.text,
        status: action.payload.status,
        createdAt: action.payload.createdAt,
      }));
    default:
      return state;
  }
};
