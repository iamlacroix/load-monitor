import { UPDATE_HEALTH_STATUS } from '../constants/actionTypes';
import { HEALTH_OK, HEALTH_WARNING } from '../constants/healthStatus';

export default (state = HEALTH_OK, action) => {
  switch (action.type) {
    case UPDATE_HEALTH_STATUS:
      // Only allow OK and WARNING statuses
      if ([HEALTH_OK, HEALTH_WARNING].includes(action.payload)) {
        return action.payload;
      }
      return state;
    default:
      return state;
  }
};
