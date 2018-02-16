import {
  CLIENT_EMAIL_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  email: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENT_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};
