import {
  ATTEMPTS_UPDATE
} from '../actions/types';

const INITIAL_STATE = 0;

// Reducer to receive the number of attempts passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ATTEMPTS_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
