import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClientFormReducer from './ClientFormReducer';
import ClientReducer from './ClientReducer';
import singleClientReducer from './singleClientReducer';
import WorkoutFormReducer from './WorkoutFormReducer';
import WorkoutReducer from './WorkoutReducer';
import ExerciseFormReducer from './ExerciseFormReducer';
import ExerciseReducer from './ExerciseReducer';

export default combineReducers({
  auth: AuthReducer,
  clientForm: ClientFormReducer,
  clients: ClientReducer,
  singleClient: singleClientReducer,
  workoutForm: WorkoutFormReducer,
  workouts: WorkoutReducer,
  exerciseForm: ExerciseFormReducer,
  exercises: ExerciseReducer
});
