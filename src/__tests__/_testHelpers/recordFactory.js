import { Map } from 'immutable';

export default (value, date = Date.now()) => Map({
  avg1Min: value,
  avg5Min: value,
  avg15Min: value,
  recordedAt: date,
});
