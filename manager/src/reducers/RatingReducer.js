import {
  RATING_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  rating: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RATING_CHANGED:
      return { ...state, rating: action.payload };
    default:
      return state;
  }
};
