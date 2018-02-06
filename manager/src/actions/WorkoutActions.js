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

export const workoutCreate = ({ workoutName, exerciseTime, restTime, sets, clientUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    debugger;

    const workoutUid = mGroupRef.push().getKey();

    mGroupRef.child(workoutUid).setValue(firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts`))
      .push({ workoutName, exerciseTime, restTime, sets }).getKey()
      .then(() => {
        dispatch({ type: WORKOUT_CREATE });
        debugger;
        Actions.exerciseCreate({ clientUid, workoutUid });
      });
  };
};






  //   firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts`)
    //   .push({ workoutName, exerciseTime, restTime, sets })
    //   .then(() => {
    //     dispatch({ type: WORKOUT_CREATE });
        // Actions.pop({ type: 'reset' });
        // Actions.exerciseCreate({ clientUid, workoutUid });

export const workoutsFetch = ({clientUid}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    //debugger;
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts`)
      .on('value', snapshot => {
        dispatch({ type: WORKOUTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const workoutSave = ({ workoutName, clientUid, workoutUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}`)
      .set({ workoutName })
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
