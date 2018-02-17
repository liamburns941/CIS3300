import {
  SET_UPDATE
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
