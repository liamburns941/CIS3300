import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

// Reducer to receive the values for pt auth form passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Receive the updated email value and add it to the state
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, error: '' };
    // Receive the updated password value and add it to the state
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' };
    // Set the loading to true and add it to the state, while the user waits for the result of the login
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    // Log the user in and set the state to the initial state
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    // Show the user an error message as they are not able to log in
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    default:
      return state;
  }
};
