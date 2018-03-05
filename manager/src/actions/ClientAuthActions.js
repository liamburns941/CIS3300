import {
  CLIENT_EMAIL_CHANGED,
  CLIENT_LOGIN_FAIL
} from './types';

// Action to get the value of the client's email
export const clientEmailChanged = (text) => {
  return {
    type: CLIENT_EMAIL_CHANGED,
    payload: text
  };
};

// Action to confirm that the client login has failed
export const clientLoginFail = () => {
  return {
    type: CLIENT_LOGIN_FAIL
  };
};
