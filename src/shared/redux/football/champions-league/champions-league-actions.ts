import axios from 'axios';

import * as C from './champions-league-constants';
import * as T from './champions-league-types';
import { youtubeAPI, gameonAPI } from '../../../../helpers/constants';
import { sleep, sortFootballSchedule } from '../../../../helpers/utils';

import CL_TEAMS from '../../../../mockApiData/championsLeagueTeams.json';
import CL_SCHEDULE from '../../../../mockApiData/championsLeagueSchedule.json';
import CL_PLAYLIST from '../../../../mockApiData/champsLeagueYoutube.json';
import { ThunkAction } from 'redux-thunk';
import { ReduxState } from '../../redux-state';
import { FootballSchedule } from '../../../../types/football-api/football-schedule.model';

// Get Schedule
export function getChampionsLeagueScheduleRequest(): T.GetChampionsLeagueScheduleRequest {
  return { type: C.GET_CHAMPIONS_LEAGUE_SCHEDULE_REQUEST }
}
export function getChampionsLeagueScheduleSuccess(payload, sortedSchedule): T.GetChampionsLeagueScheduleSuccess {
  return {
    type: C.GET_CHAMPIONS_LEAGUE_SCHEDULE_SUCCESS,
    payload,
    sortedSchedule
  }
}
export function getChampionsLeagueScheduleFailure(err): T.GetChampionsLeagueScheduleFailure {
  return { type: C.GET_CHAMPIONS_LEAGUE_SCHEDULE_FAILURE, err }
}

// export const getChampionsLeagueSchedule = (): ThunkAction<
//   Promise<void>, ReduxState, null, T.ChampionsLeagueActionTypes
// > => async (dispatch) => {
//   dispatch(getChampionsLeagueScheduleRequest());
//   return axios({
//     method: 'get',
//     url: gameonAPI.HOST + gameonAPI.CHAMPIONS_LEAGUE + gameonAPI.SCHEDULE,
//   }).then(response => {
//     const sortedSchedule = sortFootballSchedule(response.data);
//     dispatch(getChampionsLeagueScheduleSuccess(response.data, sortedSchedule));
//   }).catch(err => {
//     dispatch(getChampionsLeagueScheduleFailure(err));
//   });
// };

// return mock data
export const getChampionsLeagueSchedule = (): ThunkAction<
  Promise<T.ChampionsLeagueActionTypes>, ReduxState, null, T.ChampionsLeagueActionTypes
> => async (dispatch) => {
  dispatch(getChampionsLeagueScheduleRequest());
  await sleep(1000);
  const sortedSchedule = sortFootballSchedule(CL_SCHEDULE as FootballSchedule[]);
  return dispatch(getChampionsLeagueScheduleSuccess(CL_SCHEDULE, sortedSchedule));
};

// Get Live Games
export function getChampionsLeagueGamesLiveRequest(): T.GetChampionsLeagueGamesLiveRequest {
  return { type: C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_REQUEST }
}
export function getChampionsLeagueGamesLiveSuccess(payload): T.GetChampionsLeagueGamesLiveSuccess {
  return { type: C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_SUCCESS, payload }
}
export function getChampionsLeagueGamesLiveFailure(err): T.GetChampionsLeagueGamesLiveFailure {
  return { type: C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_FAILURE, err }
}

export const getChampionsLeagueGamesLive = (): ThunkAction<
  Promise<void>, ReduxState, null, T.ChampionsLeagueActionTypes
> => async (dispatch) => {
  dispatch(getChampionsLeagueGamesLiveRequest());
  return axios({
    method: 'get',
    url: gameonAPI.HOST + gameonAPI.CHAMPIONS_LEAGUE + gameonAPI.GAMES + gameonAPI.LIVE,
  }).then(response => {
    const sortedSchedule = sortFootballSchedule(response.data);
    dispatch(getChampionsLeagueScheduleSuccess(response.data, sortedSchedule));
  }).catch(err => {
    dispatch(getChampionsLeagueScheduleFailure(err));
  });
};

// return mock data
// export const getChampionsLeagueGamesLive = (): ThunkAction<
//   Promise<T.ChampionsLeagueActionTypes>, ReduxState, null, T.ChampionsLeagueActionTypes
// > => async (dispatch) => {
//   dispatch(getChampionsLeagueScheduleRequest());
//   await sleep(1000);
//   const sortedSchedule = sortFootballSchedule(CL_SCHEDULE);
//   return dispatch(getChampionsLeagueScheduleSuccess(CL_SCHEDULE, sortedSchedule));
// };

// Get Teams
export function getChampionsLeagueTeamsRequest(): T.GetChampionsLeagueTeamsRequest {
  return { type: C.GET_CHAMPIONS_LEAGUE_TEAMS_REQUEST }
}
export function getChampionsLeagueTeamsSuccess(payload): T.GetChampionsLeagueTeamsSuccess {
  return { type: C.GET_CHAMPIONS_LEAGUE_TEAMS_SUCCESS, payload }
}
export function getChampionsLeagueTeamsFailure(err): T.GetChampionsLeagueTeamsFailure {
  return { type: C.GET_CHAMPIONS_LEAGUE_TEAMS_FAILURE, err }
}

// export const getChampionsLeagueTeams = (): ThunkAction<
//   Promise<void>, ReduxState, null, T.ChampionsLeagueActionTypes
// > => async (dispatch) => {
//   dispatch(getChampionsLeagueTeamsRequest());
//   return axios({
//     method: 'get',
//     url: gameonAPI.HOST + gameonAPI.CHAMPIONS_LEAGUE + gameonAPI.TEAMS
//   }).then(response => {
//     dispatch(getChampionsLeagueTeamsSuccess(response.data));
//   }).catch(err => {
//     dispatch(getChampionsLeagueTeamsFailure(err));
//   });
// };

// return mock data
export const getChampionsLeagueTeams = (): ThunkAction<
  Promise<T.ChampionsLeagueActionTypes>, ReduxState, null, T.ChampionsLeagueActionTypes
> => async (dispatch) => {
  dispatch(getChampionsLeagueTeamsRequest());
  await sleep(1000);
  return dispatch(getChampionsLeagueTeamsSuccess(CL_TEAMS));
};

// Get Videos
export function getChampionsLeagueVideosRequest(): T.GetChampionsLeagueVideosRequest {
  return { type: C.GET_CHAMPIONS_LEAGUE_VIDEOS_REQUEST }
}
export function getChampionsLeagueVideosSuccess(payload): T.GetChampionsLeagueVideosSuccess {
  return { type: C.GET_CHAMPIONS_LEAGUE_VIDEOS_SUCCESS, payload }
}
export function getChampionsLeagueVideosFailure(err): T.GetChampionsLeagueVideosFailure {
  return { type: C.GET_CHAMPIONS_LEAGUE_VIDEOS_FAILURE, err }
}

// export const getChampionsLeagueVideos = (): ThunkAction<
//   Promise<void>, ReduxState, null, T.ChampionsLeagueActionTypes
// > => async (dispatch) => {
//   dispatch(getChampionsLeagueVideosRequest());
//   return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//     params: {
//       'part': 'snippet',
//       'playlistId': youtubeAPI.CHAMPIONS_LEAGUE_ID,
//       'maxResults': '25',
//       'key': youtubeAPI.KEY
//     }
//   }).then(response => {
//     dispatch(getChampionsLeagueVideosSuccess(response.data.items));
//   }).catch(err => {
//     dispatch(getChampionsLeagueVideosFailure(err));
//   });
// };

// mock data
export const getChampionsLeagueVideos = (): ThunkAction<
  Promise<T.ChampionsLeagueActionTypes>, ReduxState, null, T.ChampionsLeagueActionTypes
> => async (dispatch) => {
  dispatch(getChampionsLeagueVideosRequest());
  await sleep(1500);
  return dispatch(getChampionsLeagueVideosSuccess(CL_PLAYLIST.items));
};