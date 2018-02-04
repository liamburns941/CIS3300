import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EXERCISE_UPDATE,
  EXERCISE_CREATE,
  EXERCISES_FETCH_SUCCESS,
  EXERCISE_SAVE_SUCCESS
} from './types';

export const exerciseUpdate = ({ prop, value }) => {
  return {
    type: EXERCISE_UPDATE,
    payload: { prop, value }
  };
};

export const exerciseCreate = ({ name, clientUid, workoutUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}/exercises`)
      .push({ name })
      .then(() => {
        dispatch({ type: EXERCISE_CREATE });
        Actions.pop({ type: 'reset' });
      });
  };
};

export const exercisesFetch = ({ clientUid, workoutUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    //debugger;
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/workouts/${workoutUid}/exercises`)
      .on('value', snapshot => {
        dispatch({ type: EXERCISES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const exerciseSave = ({ name, clientUid, workoutUid, exerciseUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}/exercises/${exerciseUid}`)
      .set({ name })
      .then(() => {
        dispatch({ type: EXERCISE_SAVE_SUCCESS });
        Actions.pop({ type: 'reset' });
      });
  };
};

export const exerciseDelete = ({ clientUid, workoutUid, exerciseUid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}/exercises/${exerciseUid}`)
      .remove()
      .then(() => {
        Actions.pop({ type: 'reset' });
      });
  };
};
