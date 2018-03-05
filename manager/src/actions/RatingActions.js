import {
  RATING_CHANGED,
} from './types';

// Action to store the exercise rating in the state to be passed with the new exercise save
export const ratingChanged = (text) => {
  return {
    type: RATING_CHANGED,
    payload: text
  };
};
