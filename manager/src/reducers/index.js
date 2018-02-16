import { combineReducers } from 'redux';
import PTAuthReducer from './PTAuthReducer';
import ClientAuthReducer from './ClientAuthReducer';
import ClientAuthListReducer from './ClientAuthListReducer';
import ClientFormReducer from './ClientFormReducer';
import ClientReducer from './ClientReducer';
import SingleClientReducer from './SingleClientReducer';
import WorkoutFormReducer from './WorkoutFormReducer';
import WorkoutReducer from './WorkoutReducer';
import SingleWorkoutReducer from './SingleWorkoutReducer';
import ExerciseFormReducer from './ExerciseFormReducer';
import ExerciseReducer from './ExerciseReducer';

export default combineReducers({
  ptAuth: PTAuthReducer,
  clientAuth: ClientAuthReducer,
  clientAuthList: ClientAuthListReducer,
  clientForm: ClientFormReducer,
  clients: ClientReducer,
  singleClient: SingleClientReducer,
  workoutForm: WorkoutFormReducer,
  workouts: WorkoutReducer,
  singleWorkout: SingleWorkoutReducer,
  exerciseForm: ExerciseFormReducer,
  exercises: ExerciseReducer
});
