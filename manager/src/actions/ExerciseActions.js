import firebase from 'firebase';
import moment from 'moment';
import {
  EXERCISE_CREATE,
  EXERCISES_FETCH_SUCCESS,
  EXERCISE_FETCH_SUCCESS,
  EXERCISE_SAVE_SUCCESS,
  BENCHMARK_UPDATE,
  EXERCISE_NUMBER_UPDATE,
  NO_OF_EXERCISES_UPDATE
} from './types';

// Action to create the exercise in firebase
export const exerciseCreate = ({ exerciseName, benchmark, clientUid, workoutUid }) => {
  // Get the current logged in user from firebase so that the exercise can be added under their clients
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    // Get the specific location in firebase
    const ref = firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}/exercises`);

    // Get the current date
    const dateAddedToWorkout = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    // Push these values to create the exercise
    const exercise = ref.push({
      exerciseName,
      benchmark,
      rating: '',
      dateAddedToWorkout
    });

    exercise.then(() => {
        dispatch({ type: EXERCISE_CREATE });
      });
  };
};

// Action to get the list of exercises for a specific workout
export const exercisesFetch = ({ clientUid, workoutUid }) => {
  // Get the current logged in user from firebase so the exercises can be found
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    // Get the specific location in firebase
    firebase.database().ref(`/users/${currentUser.uid}/clients/${clientUid}/workouts/${workoutUid}/exercises`)
      .on('value', snapshot => {
        // Dispatch the list of exercises so they will be loaded in the state
        dispatch({ type: EXERCISES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

// Action to get the specific passed exercise into the state
export const exerciseFetch = (exercise) => {
    return { type: EXERCISE_FETCH_SUCCESS, payload: exercise };
};

// Action to save the exercise information
export const exerciseSave = ({ clientUid, workoutUid, exerciseUid, rating }) => {
  return (dispatch) => {
    // Get the specific location in firebase
    const ref = firebase.database().ref().child(`/users/pKlr8qiNUCbStPlzSX4EEpNczNv2/clients/${clientUid}/workouts/${workoutUid}/exercises/${exerciseUid}`);

    // Update the rating of the exercise with the rating passed into this function
    ref.update({ rating })
       .then(() => {
        dispatch({ type: EXERCISE_SAVE_SUCCESS });
       });
  };
};

// Action to store the current benchmark in the state so that it can be passed with exerciseCreate
export const benchmarkUpdate = (benchmark) => {
    return { type: BENCHMARK_UPDATE, payload: benchmark };
};

// Action to store the number of exercises for a specific workout in the state so that it can be used to check if the number of the current exercise is the maximum amount of exercises
export const noOfExercisesUpdate = (noOfExercises) => {
    return { type: NO_OF_EXERCISES_UPDATE, payload: noOfExercises };
};

// Action to store the current exercise's number in the state
export const exerciseNumberUpdate = (exerciseNumber) => {
    return { type: EXERCISE_NUMBER_UPDATE, payload: exerciseNumber };
};
