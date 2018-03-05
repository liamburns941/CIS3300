import {
  RATING_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  rating: ''
};

// Reducer to receive the role passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RATING_CHANGED:
      return { ...state, rating: action.payload };
    default:
      return state;
  }
};
