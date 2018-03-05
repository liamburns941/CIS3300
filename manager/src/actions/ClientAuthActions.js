import {
  CLIENT_EMAIL_CHANGED,
  CLIENT_LOGIN_FAIL
} from './types';

export const clientEmailChanged = (text) => {
  return {
    type: CLIENT_EMAIL_CHANGED,
    payload: text
  };
};

export const clientLoginFail = () => {
  return {
    type: CLIENT_LOGIN_FAIL
  };
};
