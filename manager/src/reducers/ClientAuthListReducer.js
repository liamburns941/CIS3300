import {
  CLIENTS_LOOKUP
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENTS_LOOKUP:
      return action.payload;
    default:
      return state;
  }
};
