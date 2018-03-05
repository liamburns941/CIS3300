import {
  WORKOUT_UPDATE,
  WORKOUT_CREATE,
  WORKOUT_SAVE_FOR_REVIEW,
  WORKOUT_COMPLETE
} from '../actions/types';

const INITIAL_STATE = {
  workoutName: '',
  exerciseTime: '',
  restTime: '',
  sets: '',
  dateCreated: '',
  dateCompleted: '',
  attempts: '',
  status: ''
};

// Reducer to receive the values for workout form passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Receive the updated workout value and add it to the state
    case WORKOUT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    // Create the workout and set the state to the initial state
    case WORKOUT_CREATE:
      return INITIAL_STATE;
    // Save the workout for review and set the state to the initial state
    case WORKOUT_SAVE_FOR_REVIEW:
      return INITIAL_STATE;
    // Complete the workout and set the state to the initial state
    case WORKOUT_COMPLETE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
