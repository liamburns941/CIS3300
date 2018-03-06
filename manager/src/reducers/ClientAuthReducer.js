import {
  CLIENT_EMAIL_CHANGED,
  CLIENT_LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  error: ''
};

// Reducer to receive the values for client auth passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Receive the value of the email and add it to the state
    case CLIENT_EMAIL_CHANGED:
      return { ...state, email: action.payload, error: '' };
    // Receive the value that the login has failed and return the error message
    case CLIENT_LOGIN_FAIL:
      return { ...state, error: 'Authentication Failed.' };
    default:
      return state;
  }
};
