import {
  CLIENTS_LOOKUP
} from '../actions/types';

const INITIAL_STATE = {};

// Reducer to receive the clients passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENTS_LOOKUP:
      return action.payload;
    default:
      return state;
  }
};
