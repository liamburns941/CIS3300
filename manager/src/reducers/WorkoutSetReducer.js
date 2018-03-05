import {
  SET_UPDATE
} from '../actions/types';

const INITIAL_STATE = {};

// Reducer to receive the set passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
