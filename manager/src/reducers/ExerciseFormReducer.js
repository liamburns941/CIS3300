import {
  EXERCISE_CREATE,
  EXERCISE_SAVE_SUCCESS,
  RATING_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  exerciseName: '',
  benchmark: '',
  dateAddedToWorkout: '',
  rating: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EXERCISE_CREATE:
      return INITIAL_STATE;
    case EXERCISE_SAVE_SUCCESS:
      return INITIAL_STATE;
    case RATING_CHANGED:
      return { ...state, rating: action.payload };
    default:
      return state;
  }
};
