import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

// Action to get the value of the personal trainer's email
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

// Action to get the value of the personal trainer's password
export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

// Action to attempt to log the user in with the values entered for email and password
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    // If the user can be logged in, got to loginUserSuccess, if not go to loginUserFail
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};

// Action to return the error message as the user cannot be logged in
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

// Action to log the user in
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  // As the user has been logged in, this is to move them to the PT side of the app
  Actions.ptSide();
};
