import { combineReducers } from 'redux';
import PTAuthReducer from './PTAuthReducer';
import ClientAuthReducer from './ClientAuthReducer';
import ClientAuthListReducer from './ClientAuthListReducer';
import ClientFormReducer from './ClientFormReducer';
import ClientReducer from './ClientReducer';
import SingleClientReducer from './SingleClientReducer';
import WorkoutFormReducer from './WorkoutFormReducer';
import WorkoutReducer from './WorkoutReducer';
import WorkoutAttemptsReducer from './WorkoutAttemptsReducer';
import WorkoutIsNotCancelledReducer from './WorkoutIsNotCancelledReducer';
import WorkoutWarmUpTimeReducer from './WorkoutWarmUpTimeReducer';
import SingleWorkoutReducer from './SingleWorkoutReducer';
import ExerciseFormReducer from './ExerciseFormReducer';
import ExerciseReducer from './ExerciseReducer';
import GlobalExerciseReducer from './GlobalExerciseReducer';
import ExerciseSetReducer from './ExerciseSetReducer';
import ExerciseBenchmarkReducer from './ExerciseBenchmarkReducer';
import ExerciseNumberReducer from './ExerciseNumberReducer';
import NoOfExerciseReducer from './NoOfExerciseReducer';
import SingleExerciseReducer from './SingleExerciseReducer';
import RoleReducer from './RoleReducer';
import RatingReducer from './RatingReducer';

export default combineReducers({
  ptAuth: PTAuthReducer,
  clientAuth: ClientAuthReducer,
  clientAuthList: ClientAuthListReducer,
  clientForm: ClientFormReducer,
  clients: ClientReducer,
  singleClient: SingleClientReducer,
  workoutForm: WorkoutFormReducer,
  workouts: WorkoutReducer,
  attempts: WorkoutAttemptsReducer,
  workoutIsNotCancelled: WorkoutIsNotCancelledReducer,
  workoutWarmUpTime: WorkoutWarmUpTimeReducer,
  singleWorkout: SingleWorkoutReducer,
  exerciseForm: ExerciseFormReducer,
  exercises: ExerciseReducer,
  globalExercises: GlobalExerciseReducer,
  sets: ExerciseSetReducer,
  benchmark: ExerciseBenchmarkReducer,
  exerciseNumber: ExerciseNumberReducer,
  noOfExercises: NoOfExerciseReducer,
  singleExercise: SingleExerciseReducer,
  role: RoleReducer,
  rating: RatingReducer
});
