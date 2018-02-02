import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CLIENT_UPDATE,
  CLIENT_CREATE,
  CLIENTS_FETCH_SUCCESS,
  CLIENT_SAVE_SUCCESS
} from './types';

export const clientUpdate = ({ prop, value }) => {
  return {
    type: CLIENT_UPDATE,
    payload: { prop, value }
  };
};

export const clientCreate = ({ name, phone }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients`)
      .push({ name, phone })
      .then(() => {
        dispatch({ type: CLIENT_CREATE });
        Actions.pop({ type: 'reset' });
      });
  };
};

export const clientsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients`)
      .on('value', snapshot => {
        dispatch({ type: CLIENTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const clientSave = ({ name, phone, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}`)
      .set({ name, phone })
      .then(() => {
        dispatch({ type: CLIENT_SAVE_SUCCESS });
        Actions.pop({ type: 'reset' });
      });
  };
};

export const clientDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}`)
      .remove()
      .then(() => {
        Actions.pop({ type: 'reset' });
      });
  };
};
