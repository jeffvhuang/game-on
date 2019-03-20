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

// Get Leagues
export const getDotaLeaguesRequest = () => ({ type: A.GET_DOTA_LEAGUES_REQUEST });
export const getDotaLeaguesSuccess = (payload) => ({ type: A.GET_DOTA_LEAGUES_SUCCESS, payload });
export const getDotaLeaguesFailure = (err) => ({ type: A.GET_DOTA_LEAGUES_FAILURE, err });

export const getDotaLeagues = () => {
  return (dispatch) => {
    dispatch(getDotaLeaguesRequest());
    return axios.get(dotaAPI.HOST + dotaAPI.LEAGUES)
      .then(response => {
        dispatch(getDotaLeaguesSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDotaLeaguesFailure(err));
        throw(err);
      });
  };
};

// Get Pro Matches
export const getDotaProMatchesRequest = () => ({ type: A.GET_DOTA_PRO_MATCHES_REQUEST });
export const getDotaProMatchesSuccess = (payload) => ({ type: A.GET_DOTA_PRO_MATCHES_SUCCESS, payload });
export const getDotaProMatchesFailure = (err) => ({ type: A.GET_DOTA_PRO_MATCHES_FAILURE, err });

export const getDotaProMatches = () => {
  return (dispatch) => {
    dispatch(getDotaProMatchesRequest());
    return axios.get(dotaAPI.HOST + dotaAPI.PRO_MATCHES)
      .then(response => {
        dispatch(getDotaProMatchesSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDotaProMatchesFailure(err));
        throw(err);
      });
  };
};
