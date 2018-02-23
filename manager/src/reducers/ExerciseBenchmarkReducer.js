import {
  BENCHMARK_UPDATE
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BENCHMARK_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
