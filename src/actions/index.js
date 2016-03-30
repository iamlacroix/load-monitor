import uuid from 'node-uuid';
import {
  ADD_HEALTH_MESSAGE,
  RECEIVE_LOAD_AVERAGE,
  UPDATE_HEALTH_STATUS,
} from '../constants/actionTypes';

export const addHealthMessage = (text, status) => ({
  type: ADD_HEALTH_MESSAGE,
  payload: {
    id: uuid.v4(),
    text,
    status,
    createdAt: new Date(),
  },
});

export const receiveAverages = (averages) => ({
  type: RECEIVE_LOAD_AVERAGE,
  payload: averages,
});

export const updateHealth = (status) => ({
  type: UPDATE_HEALTH_STATUS,
  payload: status,
});
