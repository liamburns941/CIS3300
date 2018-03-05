import {
  WORKOUT_IS_NOT_CANCELLED
} from '../actions/types';

const INITIAL_STATE = true;

// Reducer to receive the value of if the workout has been cancelled and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORKOUT_IS_NOT_CANCELLED:
      return action.payload;
    default:
      return state;
  }
};
