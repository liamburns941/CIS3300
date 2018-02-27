import {
  WORKOUT_WARM_UP_TIME_UPDATED
} from '../actions/types';

const INITIAL_STATE = 5;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORKOUT_WARM_UP_TIME_UPDATED:
      return action.payload;
    default:
      return state;
  }
};
