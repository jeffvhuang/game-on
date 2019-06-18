import axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import * as T from './tennis-types';
import * as C from './tennis-constants';
import { youtubeAPI, gameonAPI } from '../../../helpers/constants';
import { sleep, sortTennisSchedule } from '../../../helpers/utils';

// Mock data
import TOURNAMENTS from '../../../mockApiData/tennisTournaments.json';
import TOURNAMENT_INFO from '../../../mockApiData/tennisTournamentInfo.json';
import TOURNAMENT_SCHEDULE from '../../../mockApiData/tennisTournamentSchedule.json';
// import { PLAYLIST } from '../../../mockApiData/TennisYoutube';

// Get Tournaments
export function getTennisTournamentsRequest(): T.GetTennisTournamentsRequest {
  return { type: C.GET_TENNIS_TOURNAMENTS_REQUEST }
}
export function getTennisTournamentsSuccess(payload, sortedTournaments): T.GetTennisTournamentsSuccess {
  return {
    type: C.GET_TENNIS_TOURNAMENTS_SUCCESS,
    payload,
    sortedTournaments
  }
}
export function getTennisTournamentsFailure(err): T.GetTennisTournamentsFailure {
  return { type: C.GET_TENNIS_TOURNAMENTS_FAILURE, err }
}

// export function getTennisTournaments() {
//   return async function (dispatch) => {
//     dispatch(getTennisTournamentsRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.TENNIS + gameonAPI.TOURNAMENTS,
//     }).then(response => {
//       const today = new Date();
//       const thisYear = today.getFullYear();

//       const tournaments = response.data.filter(t => 
//         ((t.type == 'singles' && t.category.level) || t.type == 'mixed') &&
//         t.currentSeason.year == thisYear);

//       const sortedTournaments = sortTennisSchedule(tournaments);
//       dispatch(getTennisTournamentsSuccess(tournaments, sortedTournaments));
//     }).catch(err => {
//       dispatch(getTennisTournamentsFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export function getTennisTournaments() {
  return async function (dispatch) {
    dispatch(getTennisTournamentsRequest());
    await sleep(1000);
    const today = new Date();
    const thisYear = today.getFullYear();

    const tournaments = TOURNAMENTS.filter(t =>
      ((t.type == 'singles' && t.category.level) || t.type == 'mixed') &&
      t.currentSeason.year == thisYear);

    const sortedTournaments = sortTennisSchedule(tournaments);
    return dispatch(getTennisTournamentsSuccess(tournaments, sortedTournaments));
  };
};

// Get Tournament schedule
export function getTennisTournamentScheduleRequest(): T.GetTennisTournamentScheduleRequest {
  return { type: C.GET_TENNIS_TOURNAMENT_SCHEDULE_REQUEST }
}
export function getTennisTournamentScheduleSuccess(payload): T.GetTennisTournamentScheduleSuccess {
  return { type: C.GET_TENNIS_TOURNAMENT_SCHEDULE_SUCCESS, payload }
}
export function getTennisTournamentScheduleFailure(err): T.GetTennisTournamentScheduleFailure {
  return { type: C.GET_TENNIS_TOURNAMENT_SCHEDULE_FAILURE, err }
}
export function clearTennisTournamentScheduleSuccess(): T.ClearTennisTournamentScheduleSuccess {
  return { type: C.CLEAR_TENNIS_TOURNAMENT_SCHEDULE }
}

// export function getTennisTournamentSchedule(tournamentId) {
//   return async function (dispatch) {
//     dispatch(getTennisTournamentScheduleRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.TENNIS + gameonAPI.TOURNAMENTS + "/" + tournamentId + gameonAPI.SCHEDULE,
//     }).then(response => {
//       dispatch(getTennisTournamentScheduleSuccess(response.data));
//       return response.data;
//     }).catch(err => {
//       dispatch(getTennisTournamentScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

export function getTennisTournamentSchedule(tournamentId): T.GetTennisScheduleAction {
  return {
    async function (dispatch) {
      dispatch(getTennisTournamentScheduleRequest());
      await sleep(1000);
      dispatch(getTennisTournamentScheduleSuccess(TOURNAMENT_SCHEDULE));
      return TOURNAMENT_SCHEDULE;
    }
  }
};

// export function getTennisTournamentSchedule(tournamentId: string): 
// ThunkAction<Promise<TennisTournamentSchedule>, {}, {}, AnyAction> {
//   return async function (dispatch: ThunkDispatch<{}, {}, AnyAction>):
//   Promise<TennisTournamentSchedule> {
//     return new Promise<TennisTournamentSchedule>(async (resolve) => {
//       dispatch(getTennisTournamentScheduleRequest());
//       await sleep(1000);
//       dispatch(getTennisTournamentScheduleSuccess(TOURNAMENT_SCHEDULE));
//       return TOURNAMENT_SCHEDULE;
//     })
    
//   };
// };

export function clearTennisTournamentSchedule() {
  return function (dispatch) {
    dispatch(clearTennisTournamentScheduleSuccess());
  };
};

// Get Teams
export function getTennisTournamentInfoRequest(): T.GetTennisTournamentInfoRequest {
  return { type: C.GET_TENNIS_TOURNAMENT_INFO_REQUEST }
}
export function getTennisTournamentInfoSuccess(payload): T.GetTennisTournamentInfoSuccess {
  return { type: C.GET_TENNIS_TOURNAMENT_INFO_SUCCESS, payload }
}
export function getTennisTournamentInfoFailure(err): T.GetTennisTournamentInfoFailure {
  return { type: C.GET_TENNIS_TOURNAMENT_INFO_FAILURE, err }
}
export function clearTennisTournamentInfoSuccess(): T.ClearTennisTournamentInfoSuccess {
  return { type: C.CLEAR_TENNIS_TOURNAMENT_INFO }
}

// export function getTennisTournamentInfo(tournamentId) {
//   return async function (dispatch) {
//     dispatch(getTennisTournamentInfoRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.TENNIS + gameonAPI.TOURNAMENTS + "/" + tournamentId,
//     }).then(response => {
//       dispatch(getTennisTournamentInfoSuccess(response.data));
//       return response.data;
//     }).catch(err => {
//       dispatch(getTennisTournamentInfoFailure(err));
//       throw(err);
//     });
//   };
// };

export function getTennisTournamentInfo(tournamentId) {
  return async function (dispatch) {
    dispatch(getTennisTournamentInfoRequest());
    await sleep(1000);
    dispatch(getTennisTournamentInfoSuccess(TOURNAMENT_INFO));
    return TOURNAMENT_INFO;
  };
};

export function clearTennisTournamentInfo() {
  return function (dispatch) {
    dispatch(clearTennisTournamentInfoSuccess());
  };
};

// Get video from youtube playlist of Tennis highlights
export function getTennisVideosRequest(): T.GetTennisVideosRequest {
  return { type: C.GET_TENNIS_VIDEOS_REQUEST }
}
export function getTennisVideosSuccess(payload): T.GetTennisVideosSuccess {
  return { type: C.GET_TENNIS_VIDEOS_SUCCESS, payload }
}
export function getTennisVideosFailure(err): T.GetTennisVideosFailure {
  return { type: C.GET_TENNIS_VIDEOS_FAILURE, err }
}

// export function getTennisVideos() {
//   return async function (dispatch) {
//     dispatch(getTennisVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.Tennis_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getTennisVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getTennisVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
// export function getTennisVideos() {
//   return async function (dispatch) {
//     dispatch(getTennisVideosRequest());
//     await sleep(1500);
//     return dispatch(getTennisVideosSuccess(PLAYLIST.items));
//   };
// };
