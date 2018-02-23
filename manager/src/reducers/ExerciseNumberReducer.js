import {
  EXERCISE_NUMBER_UPDATE
} from '../actions/types';

const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EXERCISE_NUMBER_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
