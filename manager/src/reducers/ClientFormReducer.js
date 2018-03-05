import {
  CLIENT_UPDATE,
  CLIENT_CREATE,
  CLIENT_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: ''
};

// Reducer to receive the values for client form passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Receive the updated client value and add it to the state
    case CLIENT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    // Create the client and set the state to the initial state
    case CLIENT_CREATE:
      return INITIAL_STATE;
    // Save the client and set the state to the initial state
    case CLIENT_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
