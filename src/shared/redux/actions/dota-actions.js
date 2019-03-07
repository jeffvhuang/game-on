import { dotaActions as A } from './actions';
import axios from 'axios';

// Temporary seed data
import { dotaTournaments, dotaAPI } from '../../../helpers/dotaData';

// Get data
export const getDotaDataSuccess = (payload) => ({ type: A.GET_DOTA_DATA, payload });

export const getDotaData = () => {
  return (dispatch) => {
    return dispatch(getDotaDataSuccess(dotaTournaments));
  };
};

// get specific ticket
export const getDotaLeaguesRequest = () => ({ type: A.GET_DOTA_LEAGUES_REQUEST });
export const getDotaLeaguesSuccess = (payload) => ({ type: A.GET_DOTA_LEAGUES_SUCCESS, payload });
export const getDotaLeaguesFailure = (err) => ({ type: A.GET_DOTA_LEAGUES_FAILURE, err });

export const getDotaLeagues = () => {
  return (dispatch) => {
    dispatch(getDotaLeaguesRequest());
    return axios.get(dotaAPI + '/leagues')
      .then(response => {
        dispatch(getDotaLeaguesSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDotaLeaguesFailure(err));
        throw(err);
      });
  };
};