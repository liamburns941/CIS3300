import {
  CLIENT_EMAIL_CHANGED,
  CLIENT_LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENT_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case CLIENT_LOGIN_FAIL:
      return { ...state, error: 'Authentication Failed.' };
    default:
      return state;
  }
};
