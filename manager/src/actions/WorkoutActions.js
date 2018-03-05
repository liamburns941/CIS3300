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
  ATTEMPTS_UPDATE,
  WORKOUT_IS_NOT_CANCELLED,
  WORKOUT_WARM_UP_TIME_UPDATED,
  SET_UPDATE
} from './types';

// Action to take a value for the workout and update it in the state
export const workoutUpdate = ({ prop, value }) => {
  return {
    type: WORKOUT_UPDATE,
    payload: { prop, value }
  };
};

// Action to create the workout in firebase, using the values passed in
export const workoutCreate = ({ workoutName, exerciseTime, restTime, sets, clientUid }) => {
  // Get the current logged in user from firebase so that the workout can be added under their client
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    // Get the specific location in firebase
    const ref = firebase.database().ref().child(`/users/${currentUser.uid}/clients/${clientUid}/workouts`);

    // Get the current date
    const dateCreated = moment(new Date()).format('MMM Do YYYY, HH:mm');

    // Push the values into firebase to create the workout
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
        // Navigate the user to the workout detail page of the workout they have just created
        Actions.workoutDetail();
      });
  };
};

// Action to get the list of workouts for the a client
export const workoutsFetch = ({ clientUid }) => {
  // Get the current logged in user from firebase so that their clients can be accessed
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    // Get the specific location in firebase
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts`)
      .on('value', snapshot => {
        // Dispatch the list of workouts
        dispatch({ type: WORKOUTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

// Action to get the specific passed workout into the state
export const workoutFetch = (workout) => {
  return (dispatch) => {
    dispatch({ type: WORKOUT_FETCH_SUCCESS, payload: workout });
  };
};

// Action to save the number of attempts for a workout
export const workoutSaveForReview = ({ clientUid, workoutUid, attempts }) => {
  return (dispatch) => {
    // Get the specific location in firebase
    const ref = firebase.database().ref().child(`/users/pKlr8qiNUCbStPlzSX4EEpNczNv2/clients/${clientUid}/workouts/${workoutUid}`);

    // Update the attempts value
    ref.update({ attempts })
       .then(() => {
        dispatch({ type: WORKOUT_SAVE_FOR_REVIEW });
        // Navigate the user to the workout review
        Actions.workoutReview();
       });
  };
};

// Action to save the workout and make it ready for the client
export const workoutSave = ({ clientUid, workoutUid }) => {
  return (dispatch) => {
    // Change the status to Outstanding so it can be accessed by the client
    const status = 'Outstanding';

    // Get the specific location in firebase
    const ref = firebase.database().ref().child(`/users/pKlr8qiNUCbStPlzSX4EEpNczNv2/clients/${clientUid}/workouts/${workoutUid}`);

    // Update the state value
    ref.update({ status })
       .then(() => {
        dispatch({ type: WORKOUT_SAVE });
        // Navigate the user to the workout list
        Actions.workoutList();
       });
  };
};

// Action to complete the workout after the client has finished it
export const workoutComplete = ({ clientUid, workoutUid }) => {
  return (dispatch) => {
      // Get the specific location in firebase
    const ref = firebase.database().ref().child(`/users/pKlr8qiNUCbStPlzSX4EEpNczNv2/clients/${clientUid}/workouts/${workoutUid}`);

    // Get the current date
    const dateCompleted = moment(new Date()).format('MMM Do YYYY, HH:mm');

    // Change the status to completed
    const status = 'Completed';

    // Update the dateCompleted and the status
    ref.update({ dateCompleted, status })
       .then(() => {
        dispatch({ type: WORKOUT_COMPLETE });
        // Navigate the user to the client workout list
        Actions.clientWorkoutList();
       });
  };
};

// Action to store the current attempts in the state so that it can be passed with workoutSaveForReview
export const attemptsUpdate = (attempts) => {
    return { type: ATTEMPTS_UPDATE, payload: attempts };
};

// Action to store if the workout has been cancelled in the state so that if it has the exercise timers will stop
export const workoutIsNotCancelledUpdate = (workoutIsNotCancelled) => {
    return { type: WORKOUT_IS_NOT_CANCELLED, payload: workoutIsNotCancelled };
};

// Action to store the number of sets so that the exercises will loop if necessary
export const setUpdate = (sets) => {
    return { type: SET_UPDATE, payload: sets };
};
