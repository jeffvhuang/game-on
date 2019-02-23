import { dotaActions as A } from './actions';

// Temporary seed data
import { dotaTournaments } from '../../../helpers/dotaData';

// Get data
export const getDotaDataSuccess = (payload) => ({ type: A.GET_DOTA_DATA, payload });

export const getDotaData = () => {
  return (dispatch) => {
    return dispatch(getDotaDataSuccess(dotaTournaments));
  };
};