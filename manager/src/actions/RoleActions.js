import {
  ROLE_UPDATE
} from './types';

// Action to store the current role of the logged in user
export const roleUpdate = (role) => {
    return { type: ROLE_UPDATE, payload: role };
};
