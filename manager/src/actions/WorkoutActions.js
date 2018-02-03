import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  WORKOUT_UPDATE,
  WORKOUT_CREATE,
  WORKOUTS_FETCH_SUCCESS,
  WORKOUT_SAVE_SUCCESS
} from './types';

export const workoutUpdate = ({ prop, value }) => {
  return {
    type: WORKOUT_UPDATE,
    payload: { prop, value }
  };
};

export const workoutCreate = ({ name, client }) => {
  const { currentUser } = firebase.auth();
  //debugger;
  //const clientUid = client.uid;
  // on line 24 client should be replaced by the clientUid

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${client}/workouts`)
      .push({ name })
      .then(() => {
        dispatch({ type: WORKOUT_CREATE });
        Actions.pop({ type: 'reset' });
      });
  };
};

export const workoutsFetch = ({ clientUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    //debugger;
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts`)
      .on('value', snapshot => {
        dispatch({ type: WORKOUTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
      // Actions.workoutList();
  };
};

export const workoutSave = ({ name, clientUid, workoutUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}`)
      .set({ name })
      .then(() => {
        dispatch({ type: WORKOUT_SAVE_SUCCESS });
        Actions.pop({ type: 'reset' });
      });
  };
};

export const workoutDelete = ({ clientUid, workoutUid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}`)
      .remove()
      .then(() => {
        Actions.pop({ type: 'reset' });
      });
  };
};
