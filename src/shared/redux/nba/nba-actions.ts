import axios from 'axios';

import * as T from './nba-types';
import * as C from './nba-constants';
import { youtubeAPI, gameonAPI } from '../../../helpers/constants';
import { sleep, sortNBASchedule } from '../../../helpers/utils';

// Mock data
import TEAMS from '../../../mockApiData/nbaTeams.json';
import SCHEDULE from '../../../mockApiData/nbaSchedule.json';
import { PLAYLIST } from '../../../mockApiData/nbaYoutube';
import { ReduxState } from '../root-reducer';
import { ThunkAction } from 'redux-thunk';

// Get video from youtube playlist of nba highlights
export function getNbaVideosRequest(): T.GetNbaVideosRequest {
  return { type: C.GET_NBA_VIDEOS_REQUEST }
}
export function getNbaVideosSuccess(payload): T.GetNbaVideosSuccess {
  return { type: C.GET_NBA_VIDEOS_SUCCESS, payload }
}
export function getNbaVideosFailure(err): T.GetNbaVideosFailure {
  return { type: C.GET_NBA_VIDEOS_FAILURE, err }
}

// export function getNbaVideos = () => {
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
export function getNbaVideos(): ThunkAction<
  Promise<T.NbaActionTypes>, ReduxState, null, T.NbaActionTypes
> {
  return async function (dispatch) {
    dispatch(getNbaVideosRequest());
    await sleep(1500);
    return dispatch(getNbaVideosSuccess(PLAYLIST.items));
  };
};

// Get Schedule
export function getNbaScheduleRequest(): T.GetNbaScheduleRequest {
  return { type: C.GET_NBA_SCHEDULE_REQUEST }
}
export function getNbaScheduleSuccess(payload, sortedSchedule): T.GetNbaScheduleSuccess {
  return { type: C.GET_NBA_SCHEDULE_SUCCESS, payload, sortedSchedule }
}
export function getNbaScheduleFailure(err): T.GetNbaScheduleFailure {
  return { type: C.GET_NBA_SCHEDULE_FAILURE, err }
}

// export function getNbaSchedule() {
//   return async function (dispatch) {
//     dispatch(getNbaScheduleRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.NBA + gameonAPI.SCHEDULE
//     }).then(response => {
//       const sortedSchedule = sortNBASchedule(response.data);
//       dispatch(getNbaScheduleSuccess(response.data, sortedSchedule));
//     }).catch(err => {
//       dispatch(getNbaScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export function getNbaSchedule(): ThunkAction<
  Promise<T.NbaActionTypes>, ReduxState, null, T.NbaActionTypes
> {
  return async function (dispatch) {
    dispatch(getNbaScheduleRequest());
    await sleep(1500);
    const sortedSchedule = sortNBASchedule(SCHEDULE);
    return dispatch(getNbaScheduleSuccess(SCHEDULE, sortedSchedule));
  };
};

// Get Teams
export function getNbaTeamsRequest(): T.GetNbaTeamsRequest {
  return { type: C.GET_NBA_TEAMS_REQUEST }
};
export function getNbaTeamsSuccess(payload): T.GetNbaTeamsSuccess {
  return { type: C.GET_NBA_TEAMS_SUCCESS, payload }
};
export function getNbaTeamsFailure(err): T.GetNbaTeamsFailure {
  return { type: C.GET_NBA_TEAMS_FAILURE, err }
};

// export function getNbaTeams() {
//   return async function (dispatch) {
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
export function getNbaTeams(): ThunkAction<
  Promise<T.NbaActionTypes>, ReduxState, null, T.NbaActionTypes
> {
  return async function (dispatch) {
    dispatch(getNbaTeamsRequest());
    await sleep(1500);
    const nbaTeams = TEAMS.filter(team => team.nbaFranchise == '1');
    return dispatch(getNbaTeamsSuccess(nbaTeams));
  };
};