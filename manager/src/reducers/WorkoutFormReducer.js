import {
  WORKOUT_UPDATE,
  WORKOUT_CREATE,
  WORKOUT_SAVE_FOR_REVIEW
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

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORKOUT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case WORKOUT_CREATE:
      return INITIAL_STATE;
    case WORKOUT_SAVE_FOR_REVIEW:
      return INITIAL_STATE;
    default:
      return state;
  }
};
