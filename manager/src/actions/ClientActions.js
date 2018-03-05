import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CLIENT_UPDATE,
  CLIENT_CREATE,
  CLIENTS_FETCH_SUCCESS,
  CLIENT_FETCH_SUCCESS
} from './types';

// Action to take a value for the client and update it in the state
export const clientUpdate = ({ prop, value }) => {
  return {
    type: CLIENT_UPDATE,
    payload: { prop, value }
  };
};

// Action to create the client in firebase, using the three values
export const clientCreate = ({ firstName, lastName, email }) => {
  // Get the current logged in user from firebase so that the client can be added under them
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    // Get the specific location in firebase
    const refVar = `/users/${currentUser.uid}/clients`;
    const ref = firebase.database().ref().child(refVar);

    // Push the three values passed into firebase to create the client
    const client = ref.push({
      firstName,
      lastName,
      email
    });

    client.then(() => {
      dispatch({ type: CLIENT_CREATE });
      // Move to workoutList
      Actions.workoutList();
    });
  };
};

// Action to get the list of clients for the current user
export const clientsFetch = () => {
  // Get the current logged in user from firebase
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    // Get the specific location in firebase
    const refVar = `/users/${currentUser.uid}/clients`;
    firebase.database().ref(refVar)
      .on('value', snapshot => {
        // Dispatch the list of clients so they will be loaded in the state
        dispatch({ type: CLIENTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

// Action to get the specific passed client into the state
export const clientFetch = (client) => {
    return { type: CLIENT_FETCH_SUCCESS, payload: client };
};
