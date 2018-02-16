import firebase from 'firebase';
import {
  CLIENTS_LOOKUP
} from './types';

export const clientsLookup = () => {
  return (dispatch) => {
    firebase.database().ref(`/users/pKlr8qiNUCbStPlzSX4EEpNczNv2/clients`)
      .on('value', snapshot => {
        dispatch({ type: CLIENTS_LOOKUP, payload: snapshot.val() });
      });
  };
};
