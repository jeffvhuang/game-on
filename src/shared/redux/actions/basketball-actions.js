import axios from 'axios';

import { basketballActions as A } from './action-types';
import { nbaAPI } from '../../../helpers/nbaData';

// Mock data
import { SCHEDULE, TEAMS } from '../../../mockApiData/rapidNba';
import { sleep, sortNBASchedule } from '../../../helpers/utils';

// Get Schedule
export const getNbaScheduleRequest = () => ({ type: A.GET_NBA_SCHEDULE_REQUEST });
export const getNbaScheduleSuccess = (payload, schedule) => ({ type: A.GET_NBA_SCHEDULE_SUCCESS, payload, schedule });
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
    const sortedSchedule = sortNBASchedule(SCHEDULE);
    return dispatch(getNbaScheduleSuccess(sortedSchedule, SCHEDULE));
  };
};

// Get Teams
export const getNbaTeamsRequest = () => ({ type: A.GET_NBA_TEAMS_REQUEST });
export const getNbaTeamsSuccess = (payload) => ({ type: A.GET_NBA_TEAMS_SUCCESS, payload });
export const getNbaTeamsFailure = (err) => ({ type: A.GET_NBA_TEAMS_FAILURE, err });

// export const getNbaTeams = () => {
//   return (dispatch) => {
//     dispatch(getNbaTeamsRequest());
//     return axios({
//       method: 'get',
//       url: nbaAPI.HOST + nbaAPI.TEAMS,
//       headers: {
//         'X-RapidAPI-Key': '9a04c3ec1dmshe9bb5802ba2545dp16f979jsndbae1452a5b5'
//       }
//     }).then(response => {
//       const nbaTeams = response.data.api.teams.filter(team => team.nbaFranchise == '1');
//       dispatch(getNbaTeamsSuccess(nbaTeams));
//     }).catch(err => {
//       dispatch(getNbaTeamsFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getNbaTeams = () => {
  return async (dispatch) => {
    dispatch(getNbaTeamsRequest());
    await sleep(2000);
    const nbaTeams = TEAMS.filter(team => team.nbaFranchise == '1');
    return dispatch(getNbaTeamsSuccess(nbaTeams));
  };
};