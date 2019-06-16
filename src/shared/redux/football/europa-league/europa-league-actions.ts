import axios from 'axios';

import * as T from './europa-league-types';
import * as C from './europa-league-constants';
import { youtubeAPI, gameonAPI } from '../../../../helpers/constants';
import { sleep, sortFootballSchedule } from '../../../../helpers/utils';

// Mock data
import EUROPA_LEAGUE_TEAMS from '../../../mockApiData/eplTeams.json';
import EUROPA_LEAGUE_SCHEDULE from '../../../mockApiData/eplSchedule.json';
// import { PLAYLIST } from '../../../mockApiData/EuropaLeagueYoutube';

// Get Schedule
export function getEuropaLeagueScheduleRequest(): T.GetEuropaLeagueScheduleRequest {
  return { type: C.GET_EUROPA_LEAGUE_SCHEDULE_REQUEST }
}
export function getEuropaLeagueScheduleSuccess(payload, sortedSchedule): T.GetEuropaLeagueScheduleSuccess {
  return { type: C.GET_EUROPA_LEAGUE_SCHEDULE_SUCCESS, payload, sortedSchedule }
}
export function getEuropaLeagueScheduleFailure(err): T.GetEuropaLeagueScheduleFailure {
  return { type: C.GET_EUROPA_LEAGUE_SCHEDULE_FAILURE, err }
}

// export function getEuropaLeagueSchedule() {
//   return async function (dispatch) {
//     dispatch(getEuropaLeagueScheduleRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.EUROPA_LEAGUE + gameonAPI.SCHEDULE,
//     }).then(response => {
//       const sortedSchedule = sortFootballSchedule(response.data);
//       dispatch(getEuropaLeagueScheduleSuccess(response.data, sortedSchedule));
//     }).catch(err => {
//       dispatch(getEuropaLeagueScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export function getEuropaLeagueSchedule() {
  return async function (dispatch) {
    dispatch(getEuropaLeagueScheduleRequest());
    await sleep(1000);
    const sortedSchedule = sortFootballSchedule(EUROPA_LEAGUE_SCHEDULE);
    return dispatch(getEuropaLeagueScheduleSuccess(EUROPA_LEAGUE_SCHEDULE, sortedSchedule));
  };
};

// Get Teams
export function getEuropaLeagueTeamsRequest(): T.GetEuropaLeagueTeamsRequest {
  return { type: C.GET_EUROPA_LEAGUE_TEAMS_REQUEST }
}
export function getEuropaLeagueTeamsSuccess(payload): T.GetEuropaLeagueTeamsSuccess {
  return { type: C.GET_EUROPA_LEAGUE_TEAMS_SUCCESS, payload }
}
export function getEuropaLeagueTeamsFailure(err): T.GetEuropaLeagueTeamsFailure {
  return { type: C.GET_EUROPA_LEAGUE_TEAMS_FAILURE, err }
}

// export function getEuropaLeagueTeams() {
//   return async function (dispatch) {
//     dispatch(getEuropaLeagueTeamsRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.EUROPA_LEAGUE + gameonAPI.TEAMS
//     }).then(response => {
//       dispatch(getEuropaLeagueTeamsSuccess(response.data));
//     }).catch(err => {
//       dispatch(getEuropaLeagueTeamsFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export function getEuropaLeagueTeams() {
  return async function (dispatch) {
    dispatch(getEuropaLeagueTeamsRequest());
    await sleep(1000);
    return dispatch(getEuropaLeagueTeamsSuccess(EUROPA_LEAGUE_TEAMS));
  };
};

// Get video from youtube playlist of EuropaLeague highlights
// export function getEuropaLeagueVideosRequest(): T.GetEuropaLeagueVideosRequest {
//   return { type: C.GET_EUROPA_LEAGUE_VIDEOS_REQUEST }
// }
// export function getEuropaLeagueVideosSuccess(payload): T.GetEuropaLeagueVideosSuccess {
//   return { type: C.GET_EUROPA_LEAGUE_VIDEOS_SUCCESS, payload }
// }
// export function getEuropaLeagueVideosFailure(err): T.GetEuropaLeagueVideosFailure {
//   return { type: C.GET_EUROPA_LEAGUE_VIDEOS_FAILURE, err }
// }

// export function getEuropaLeagueVideos() {
//   return async function (dispatch) {
//     dispatch(getEuropaLeagueVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.CHAMPIONS_LEAGUE_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getEuropaLeagueVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getEuropaLeagueVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
// export function getEuropaLeagueVideos() {
//   return async function (dispatch) {
//     dispatch(getEuropaLeagueVideosRequest());
//     await sleep(1500);
//     return dispatch(getEuropaLeagueVideosSuccess(PLAYLIST.items));
//   };
// };