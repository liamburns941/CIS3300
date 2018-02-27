import {
  WORKOUT_IS_NOT_CANCELLED
} from '../actions/types';

const INITIAL_STATE = true;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORKOUT_IS_NOT_CANCELLED:
      return action.payload;
    default:
      return state;
  }
};
