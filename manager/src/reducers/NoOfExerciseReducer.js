import {
  NO_OF_EXERCISES_UPDATE
} from '../actions/types';

const INITIAL_STATE = {};

// Reducer to receive the number of exercises passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NO_OF_EXERCISES_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
