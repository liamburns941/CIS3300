import {
  ROLE_UPDATE
} from './types';

export const roleUpdate = (role) => {
    return { type: ROLE_UPDATE, payload: role };
};
