import firebase from 'firebase';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import {
  WORKOUT_UPDATE,
  WORKOUT_CREATE,
  WORKOUTS_FETCH_SUCCESS,
  WORKOUT_FETCH_SUCCESS,
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
    const ref = firebase.database().ref().child(`/users/${currentUser.uid}/clients/${clientUid}/workouts`);

    const dateCreated = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const workout = ref.push({
      workoutName,
      exerciseTime,
      restTime,
      sets,
      dateCreated,
      dateCompleted: '',
      attempts: '0',
      status: 'Outstanding'
    });

    const workoutUid = workout.key;

    workout.then(() => {
        dispatch({ type: WORKOUT_CREATE });
        Actions.exerciseCreate({ clientUid, workoutUid });
      });
  };
};

export const workoutsFetch = ({ clientUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts`)
      .on('value', snapshot => {
        dispatch({ type: WORKOUTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const workoutFetch = (workout) => {
    return { type: WORKOUT_FETCH_SUCCESS, payload: workout };
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
