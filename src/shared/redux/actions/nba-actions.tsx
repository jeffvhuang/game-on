import axios from 'axios';

import { nbaActions as A } from './action-types';
import { youtubeAPI, gameonAPI } from '../../../helpers/constants';
import { sleep, sortNBASchedule } from '../../../helpers/utils';

// Mock data
import TEAMS from '../../../mockApiData/nbaTeams.json';
import SCHEDULE from '../../../mockApiData/nbaSchedule.json';
import { PLAYLIST } from '../../../mockApiData/nbaYoutube';


// Get video from youtube playlist of nba highlights
export const getNbaVideosRequest = () => ({ type: A.GET_NBA_VIDEOS_REQUEST });
export const getNbaVideosSuccess = (payload) => ({ type: A.GET_NBA_VIDEOS_SUCCESS, payload });
export const getNbaVideosFailure = (err) => ({ type: A.GET_NBA_VIDEOS_FAILURE, err });

// export const getNbaVideos = () => {
//   return (dispatch) => {
//     dispatch(getNbaVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.NBA_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getNbaVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getNbaVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
export const getNbaVideos = () => {
  return async (dispatch) => {
    dispatch(getNbaVideosRequest());
    await sleep(1500);
    return dispatch(getNbaVideosSuccess(PLAYLIST.items));
  };
};

// Get Schedule
export const getNbaScheduleRequest = () => ({ type: A.GET_NBA_SCHEDULE_REQUEST });
export const getNbaScheduleSuccess = (payload, schedule) => ({ type: A.GET_NBA_SCHEDULE_SUCCESS, payload, schedule });
export const getNbaScheduleFailure = (err) => ({ type: A.GET_NBA_SCHEDULE_FAILURE, err });

// export const getNbaSchedule = () => {
//   return (dispatch) => {
//     dispatch(getNbaScheduleRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.NBA + gameonAPI.SCHEDULE
//     }).then(response => {
//       const sortedSchedule = sortNBASchedule(response.data);
//       dispatch(getNbaScheduleSuccess(sortedSchedule, response.data));
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
    await sleep(1500);
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
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.NBA + gameonAPI.TEAMS
//     }).then(response => {
//       const nbaTeams = response.data.filter(team => team.nbaFranchise == '1');
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
    await sleep(1500);
    const nbaTeams = TEAMS.filter(team => team.nbaFranchise == '1');
    return dispatch(getNbaTeamsSuccess(nbaTeams));
  };
};