import {
  EXERCISE_UPDATE,
  EXERCISE_CREATE,
  EXERCISE_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  exerciseName: '',
  benchmark: '',
  dateAddedToWorkout: '',
  rating: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EXERCISE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EXERCISE_CREATE:
      return INITIAL_STATE;
    case EXERCISE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
