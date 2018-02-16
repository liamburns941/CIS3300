import {
  CLIENT_EMAIL_CHANGED,
} from './types';

export const clientEmailChanged = (text) => {
  return {
    type: CLIENT_EMAIL_CHANGED,
    payload: text
  };
};
