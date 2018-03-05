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

// Reducer to receive the values for exercise passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Create the exercise and set the state to the initial state
    case EXERCISE_CREATE:
      return INITIAL_STATE;
    // Save the exercise and set the state to the initial state
    case EXERCISE_SAVE_SUCCESS:
      return INITIAL_STATE;
    // Receive the value of the rating and pass this rating to the state
    case RATING_CHANGED:
      return { ...state, rating: action.payload };
    default:
      return state;
  }
};
