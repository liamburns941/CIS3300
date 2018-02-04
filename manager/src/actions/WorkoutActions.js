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

export const workoutCreate = ({ name, exerciseTime, restTime, sets, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/workouts`)
      .push({ name, exerciseTime, restTime, sets })
      .then(() => {
        dispatch({ type: WORKOUT_CREATE });
        Actions.pop({ type: 'reset' });
      });
  };
};

export const workoutsFetch = ({uid}) => {
  const { currentUser } = firebase.auth();
  console.log(uid);

  return (dispatch) => {
    //debugger;
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/workouts`)
      .on('value', snapshot => {
        dispatch({ type: WORKOUTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
       //Actions.workoutList();
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
