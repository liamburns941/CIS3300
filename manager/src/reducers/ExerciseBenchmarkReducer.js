import {
  BENCHMARK_UPDATE
} from '../actions/types';

const INITIAL_STATE = {};

// Reducer to receive the benchmark passed into it and add it to the state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BENCHMARK_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
