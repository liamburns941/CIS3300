import firebase from 'firebase';
import {
  CLIENTS_LOOKUP
} from './types';

// Action to get the list of clients so that the entered client email can be checked against
export const clientsLookup = () => {
  return (dispatch) => {
    // Get all the clients at this location
    firebase.database().ref(`/users/pKlr8qiNUCbStPlzSX4EEpNczNv2/clients`)
      .on('value', snapshot => {
        //Dispatch that list of clients to the state
        dispatch({ type: CLIENTS_LOOKUP, payload: snapshot.val() });
      });
  };
};
