import axios from 'axios';

import * as T from './epl-types';
import * as C from './epl-constants';
import { youtubeAPI, gameonAPI } from '../../../../helpers/constants';
import { sleep, sortFootballSchedule } from '../../../../helpers/utils';

// Mock data
import EPL_TEAMS from '../../../mockApiData/eplTeams.json';
import EPL_SCHEDULE from '../../../mockApiData/eplSchedule.json';
import { ThunkAction } from 'redux-thunk';
import { ReduxState } from '../../root-reducer';
// import { PLAYLIST } from '../../../mockApiData/EplYoutube';

// Get Schedule
export function getEplScheduleRequest(): T.GetEplScheduleRequest {
  return { type: C.GET_EPL_SCHEDULE_REQUEST }
}
export function getEplScheduleSuccess(payload, sortedSchedule): T.GetEplScheduleSuccess {
  return { type: C.GET_EPL_SCHEDULE_SUCCESS, payload, sortedSchedule }
}
export function getEplScheduleFailure(err): T.GetEplScheduleFailure {
  return { type: C.GET_EPL_SCHEDULE_FAILURE, err }
}

// export function getEplSchedule() {
//   return async function (dispatch) {
//     dispatch(getEplScheduleRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.EPL + gameonAPI.SCHEDULE,
//     }).then(response => {
//       const sortedSchedule = sortFootballSchedule(response.data);
//       dispatch(getEplScheduleSuccess(response.data, sortedSchedule));
//     }).catch(err => {
//       dispatch(getEplScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getEplSchedule = (): ThunkAction<
  Promise<T.EplActionTypes>, ReduxState, null, T.EplActionTypes
> => async (dispatch) => {
  dispatch(getEplScheduleRequest());
  await sleep(1000);
  const sortedSchedule = sortFootballSchedule(EPL_SCHEDULE);
  return dispatch(getEplScheduleSuccess(EPL_SCHEDULE, sortedSchedule));
};

// Get Teams
export function getEplTeamsRequest(): T.GetEplTeamsRequest {
  return { type: C.GET_EPL_TEAMS_REQUEST }
}
export function getEplTeamsSuccess(payload): T.GetEplTeamsSuccess {
  return { type: C.GET_EPL_TEAMS_SUCCESS, payload }
}
export function getEplTeamsFailure(err): T.GetEplTeamsFailure {
  return { type: C.GET_EPL_TEAMS_FAILURE, err }
}

// export function getEplTeams() {
//   return async function (dispatch) {
//     dispatch(getEplTeamsRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.EPL + gameonAPI.TEAMS
//     }).then(response => {
//       dispatch(getEplTeamsSuccess(response.data));
//     }).catch(err => {
//       dispatch(getEplTeamsFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getEplTeams = (): ThunkAction<
  Promise<T.EplActionTypes>, ReduxState, null, T.EplActionTypes
> => async (dispatch) => {
  dispatch(getEplTeamsRequest());
  await sleep(1000);
  return dispatch(getEplTeamsSuccess(EPL_TEAMS));
};

// Get video from youtube playlist of Epl highlights
// export function getEplVideosRequest(): T.GetEplVideosRequest {
//   return { type: C.GET_EPL_VIDEOS_REQUEST }
// }
// export function getEplVideosSuccess(payload): T.GetEplVideosSuccess {
//   return { type: C.GET_EPL_VIDEOS_SUCCESS, payload }
// }
// export function getEplVideosFailure(err): T.GetEplVideosFailure {
//   return { type: C.GET_EPL_VIDEOS_FAILURE, err }
// }

// export function getEplVideos() {
//   return async function (dispatch) {
//     dispatch(getEplVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.CHAMPIONS_LEAGUE_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getEplVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getEplVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
// export const getEplVideos = (): ThunkAction<
//   Promise<T.EplActionTypes>, ReduxState, null, T.EplActionTypes
// > => async (dispatch) => {
//   dispatch(getEplVideosRequest());
//   await sleep(1500);
//   return dispatch(getEplVideosSuccess(PLAYLIST.items));
// };