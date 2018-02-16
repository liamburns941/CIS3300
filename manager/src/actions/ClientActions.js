import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CLIENT_UPDATE,
  CLIENT_CREATE,
  CLIENTS_FETCH_SUCCESS,
  CLIENT_FETCH_SUCCESS,
  CLIENT_SAVE_SUCCESS
} from './types';

export const clientUpdate = ({ prop, value }) => {
  return {
    type: CLIENT_UPDATE,
    payload: { prop, value }
  };
};

export const clientCreate = ({ firstName, lastName, email }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients`)
      .push({ firstName, lastName, email })
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

export const clientFetch = (client) => {
    return { type: CLIENT_FETCH_SUCCESS, payload: client };
};

export const clientSave = ({ firstName, lastName, email, clientUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}`)
      .set({ firstName, lastName, email })
      .then(() => {
        dispatch({ type: CLIENT_SAVE_SUCCESS });
        Actions.pop({ type: 'reset' });
      });
  };
};

export const clientDelete = ({ clientUid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}`)
      .remove()
      .then(() => {
        Actions.pop({ type: 'reset' });
      });
  };
};
