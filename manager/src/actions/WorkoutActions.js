import firebase from 'firebase';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import {
  WORKOUT_UPDATE,
  WORKOUT_CREATE,
  WORKOUTS_FETCH_SUCCESS,
  WORKOUT_FETCH_SUCCESS,
  WORKOUT_SAVE_FOR_REVIEW,
  WORKOUT_SAVE,
  WORKOUT_COMPLETE,
  WORKOUT_DETAIL_FETCH_SUCCESS,
  ATTEMPTS_UPDATE
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

    const dateCreated = moment(new Date()).format('MMM Do YYYY, h:mm');

    const workout = ref.push({
      workoutName,
      exerciseTime,
      restTime,
      sets,
      dateCreated,
      dateCompleted: '',
      attempts: '0',
      status: 'ExercisesToBeAdded'
    });

    workout.then(() => {
        dispatch({ type: WORKOUT_CREATE });
         Actions.workoutDetail();
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
  return (dispatch) => {
    dispatch({ type: WORKOUT_FETCH_SUCCESS, payload: workout });
  };
};

export const workoutDetailFetch = ({ clientUid, workoutUid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}`)
      .on('value', snapshot => {
        dispatch({ type: WORKOUT_DETAIL_FETCH_SUCCESS, payload: snapshot.val() });
        Actions.workoutDetail();
      });
  };
};

export const workoutSaveForReview = ({ clientUid, workoutUid, attempts }) => {
  return (dispatch) => {
    console.log(clientUid);
    console.log(workoutUid);
    console.log(attempts);

    const ref = firebase.database().ref().child(`/users/pKlr8qiNUCbStPlzSX4EEpNczNv2/clients/${clientUid}/workouts/${workoutUid}`);

    ref.update({ attempts })
       .then(() => {
        dispatch({ type: WORKOUT_SAVE_FOR_REVIEW });
        Actions.workoutReview();
       });
  };
};

export const workoutSave = ({ clientUid, workoutUid }) => {
  return (dispatch) => {

    const status = 'Outstanding';

    const ref = firebase.database().ref().child(`/users/pKlr8qiNUCbStPlzSX4EEpNczNv2/clients/${clientUid}/workouts/${workoutUid}`);

    ref.update({ status })
       .then(() => {
        dispatch({ type: WORKOUT_SAVE });
        Actions.workoutList();
       });
  };
};

export const workoutComplete = ({ clientUid, workoutUid }) => {
  return (dispatch) => {
    const ref = firebase.database().ref().child(`/users/pKlr8qiNUCbStPlzSX4EEpNczNv2/clients/${clientUid}/workouts/${workoutUid}`);

    const dateCompleted = moment(new Date()).format('MMM Do YYYY, h:mm');
    const status = 'Completed';

    ref.update({ dateCompleted, status })
       .then(() => {
        dispatch({ type: WORKOUT_COMPLETE });
        Actions.workoutList();
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

export const attemptsUpdate = (attempts) => {
  console.log(attempts);
    return { type: ATTEMPTS_UPDATE, payload: attempts };
};
