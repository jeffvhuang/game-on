import axios from 'axios';

import { basketballActions as A } from './action-types';
import { nbaAPI } from '../../../helpers/nbaData';

// Get Schedule
export const getNbaScheduleRequest = () => ({ type: A.GET_NBA_SCHEDULE_REQUEST });
export const getNbaScheduleSuccess = (payload) => ({ type: A.GET_NBA_SCHEDULE_SUCCESS, payload });
export const getNbaScheduleFailure = (err) => ({ type: A.GET_NBA_SCHEDULE_FAILURE, err });

export const getNbaSchedule = () => {
  return (dispatch) => {
    dispatch(getNbaScheduleRequest());
    return axios.get(nbaAPI.HOST + nbaAPI.SCHEDULE)
      .then(response => {
        dispatch(getNbaScheduleSuccess(response.data.league.standard));
      })
      .catch(err => {
        dispatch(getNbaScheduleFailure(err));
        throw(err);
      });
  };
};