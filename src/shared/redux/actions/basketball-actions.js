import axios from 'axios';

import { basketballActions as A } from './action-types';
import { nbaAPI } from '../../../helpers/nbaData';
import { SCHEDULE } from '../../../mockApiData/rapidNba';
import { sleep } from '../../../helpers/utils';

// Get Schedule
export const getNbaScheduleRequest = () => ({ type: A.GET_NBA_SCHEDULE_REQUEST });
export const getNbaScheduleSuccess = (payload) => ({ type: A.GET_NBA_SCHEDULE_SUCCESS, payload });
export const getNbaScheduleFailure = (err) => ({ type: A.GET_NBA_SCHEDULE_FAILURE, err });

// export const getNbaSchedule = () => {
//   return (dispatch) => {
//     dispatch(getNbaScheduleRequest());
//     return axios({
//       method: 'get',
//       url: nbaAPI.HOST + nbaAPI.SCHEDULE,
//       headers: {
//         'X-RapidAPI-Key': '9a04c3ec1dmshe9bb5802ba2545dp16f979jsndbae1452a5b5'
//       }
//     }).then(response => {
//       dispatch(getNbaScheduleSuccess(response.data.api.games));
//     }).catch(err => {
//       dispatch(getNbaScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getNbaSchedule = () => {
  return async (dispatch) => {
    dispatch(getNbaScheduleRequest());
    await sleep(2000);
    return dispatch(getNbaScheduleSuccess(SCHEDULE));
  };
};