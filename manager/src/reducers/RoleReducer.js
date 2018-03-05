import {
  ROLE_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  role: ''
};

// Reducer to receive the role passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROLE_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
