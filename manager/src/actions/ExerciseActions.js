import firebase from 'firebase';
import moment from 'moment';
import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  EXERCISE_UPDATE,
  EXERCISE_CREATE,
  EXERCISES_FETCH_SUCCESS,
  EXERCISE_SAVE_SUCCESS,
  SET_UPDATE
} from './types';

export const exerciseUpdate = ({ prop, value }) => {
  return {
    type: EXERCISE_UPDATE,
    payload: { prop, value }
  };
};

export const exerciseCreate = ({ exerciseName, benchmark, clientUid, workoutUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    const ref = firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}/exercises`);

    const dateAddedToWorkout = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');


      ref.push({ exerciseName, benchmark, rating: '', dateAddedToWorkout })
      .then(() => {
        dispatch({ type: EXERCISE_CREATE });
        Actions.workoutList();
        Keyboard.dismiss();
      });
  };
};

export const exercisesFetch = ({ clientUid, workoutUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}/exercises`)
      .on('value', snapshot => {
        dispatch({ type: EXERCISES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const exerciseSave = ({ exerciseName, benchmark, clientUid, workoutUid, exerciseUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}/exercises/${exerciseUid}`)
      .set({ exerciseName, benchmark })
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

export const setUpdate = (sets) => {
    return { type: SET_UPDATE, payload: sets };
};
