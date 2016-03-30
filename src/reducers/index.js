import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import averages from './averages';
import messages from './messages';
import systemHealth from './systemHealth';

const rootReducer = combineReducers({
  averages,
  browser: responsiveStateReducer,
  messages,
  systemHealth,
});

export default rootReducer;
