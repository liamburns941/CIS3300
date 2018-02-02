import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClientFormReducer from './ClientFormReducer';
import ClientReducer from './ClientReducer';
import WorkoutFormReducer from './WorkoutFormReducer';
import WorkoutReducer from './WorkoutReducer';

export default combineReducers({
  auth: AuthReducer,
  clientForm: ClientFormReducer,
  clients: ClientReducer,
  workoutForm: WorkoutFormReducer,
  workouts: WorkoutReducer
});
