import { combineReducers } from 'redux';
import ClientAuthListReducer from './ClientAuthListReducer';
import ClientAuthReducer from './ClientAuthReducer';
import ClientFormReducer from './ClientFormReducer';
import ClientReducer from './ClientReducer';
import ExerciseBenchmarkReducer from './ExerciseBenchmarkReducer';
import ExerciseFormReducer from './ExerciseFormReducer';
import ExerciseNumberReducer from './ExerciseNumberReducer';
import ExerciseReducer from './ExerciseReducer';
import ExerciseSetReducer from './ExerciseSetReducer';
import GlobalExerciseReducer from './GlobalExerciseReducer';
import NoOfExerciseReducer from './NoOfExerciseReducer';
import PTAuthReducer from './PTAuthReducer';
import RatingReducer from './RatingReducer';
import RoleReducer from './RoleReducer';
import SingleClientReducer from './SingleClientReducer';
import SingleExerciseReducer from './SingleExerciseReducer';
import SingleWorkoutReducer from './SingleWorkoutReducer';
import WorkoutAttemptsReducer from './WorkoutAttemptsReducer';
import WorkoutFormReducer from './WorkoutFormReducer';
import WorkoutIsNotCancelledReducer from './WorkoutIsNotCancelledReducer';
import WorkoutReducer from './WorkoutReducer';
import WorkoutWarmUpTimeReducer from './WorkoutWarmUpTimeReducer';

export default combineReducers({
  attempts: WorkoutAttemptsReducer,
  benchmark: ExerciseBenchmarkReducer,
  clientAuth: ClientAuthReducer,
  clientAuthList: ClientAuthListReducer,
  clientForm: ClientFormReducer,
  clients: ClientReducer,
  exerciseForm: ExerciseFormReducer,
  exerciseNumber: ExerciseNumberReducer,
  exercises: ExerciseReducer,
  globalExercises: GlobalExerciseReducer,
  noOfExercises: NoOfExerciseReducer,
  ptAuth: PTAuthReducer,
  rating: RatingReducer,
  role: RoleReducer,
  sets: ExerciseSetReducer,
  singleClient: SingleClientReducer,
  singleExercise: SingleExerciseReducer,
  singleWorkout: SingleWorkoutReducer,
  workoutForm: WorkoutFormReducer,
  workoutIsNotCancelled: WorkoutIsNotCancelledReducer,
  workouts: WorkoutReducer,
  workoutWarmUpTime: WorkoutWarmUpTimeReducer
});
