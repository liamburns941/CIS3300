import {
  RATING_CHANGED,
} from './types';

export const ratingChanged = (text) => {
  return {
    type: RATING_CHANGED,
    payload: text
  };
};
