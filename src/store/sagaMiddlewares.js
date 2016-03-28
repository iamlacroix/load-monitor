import sagaMiddleware from 'redux-saga';
import allSagas from '../sagas';

const sagas = [
  allSagas,
];

export default sagaMiddleware(...sagas);
