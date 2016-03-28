import { combineReducers } from 'redux';
import averages from './averages';

const rootReducer = combineReducers({
  averages,
});

export default rootReducer;
