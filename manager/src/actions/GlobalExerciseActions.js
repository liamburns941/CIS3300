import firebase from 'firebase';
import {
  GLOBAL_EXERCISES_FETCH_SUCCESS
} from './types';

export const globalExercisesFetch = () => {
  const { currentUser } = firebase.auth();
  const refVar = `/users/${currentUser.uid}/globalExercises`;
  return (dispatch) => {
    firebase.database().ref(refVar)
      .on('value', snapshot => {
        dispatch({ type: GLOBAL_EXERCISES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
