import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClientFormReducer from './ClientFormReducer';
import ClientReducer from './ClientReducer';
import SingleClientReducer from './SingleClientReducer';
import WorkoutFormReducer from './WorkoutFormReducer';
import WorkoutReducer from './WorkoutReducer';
import SingleWorkoutReducer from './SingleWorkoutReducer';
import ExerciseFormReducer from './ExerciseFormReducer';
import ExerciseReducer from './ExerciseReducer';

export default combineReducers({
  auth: AuthReducer,
  clientForm: ClientFormReducer,
  clients: ClientReducer,
  singleClient: SingleClientReducer,
  workoutForm: WorkoutFormReducer,
  workouts: WorkoutReducer,
  singleWorkout: SingleWorkoutReducer,
  exerciseForm: ExerciseFormReducer,
  exercises: ExerciseReducer
});
