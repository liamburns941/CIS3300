import {
  CLIENT_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

// Reducer to receive the client passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENT_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
