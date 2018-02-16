import {
  ROLE_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  role: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROLE_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
