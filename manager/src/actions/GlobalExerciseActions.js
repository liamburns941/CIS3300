import firebase from 'firebase';
import {
  GLOBAL_EXERCISES_FETCH_SUCCESS
} from './types';

// Action to get the list of the global exercises to display to the PT when they are selecting an exericse
export const globalExercisesFetch = () => {
  // Get the current logged in user from firebase
  const { currentUser } = firebase.auth();
  // Get the list of global exercises
  const refVar = `/users/${currentUser.uid}/globalExercises`;
  return (dispatch) => {
    firebase.database().ref(refVar)
      .on('value', snapshot => {
        // Dispatch the list of global exercises into the state
        dispatch({ type: GLOBAL_EXERCISES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
