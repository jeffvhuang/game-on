import axios from 'axios';
import { ThunkAction } from 'redux-thunk';

import * as T from './csgo-types';
import * as C from './csgo-constants';
import { gameonAPI, youtubeAPI } from '../../../helpers/constants';
import {
  sleep,
  sortESportsTournaments,
  sortESportByDate,
  getESportsTeamsFromMatches
} from '../../../helpers/utils';

// Temporary seed data
import TOURNAMENTS from '../../../mockApiData/csgoTournaments.json';
import MATCHES from '../../../mockApiData/csgoMatches.json';
import TOURNAMENT_MATCHES from '../../../mockApiData/csgoTournamentMatches.json';
// import TEAMS from '../../../mockApiData/loTeams.json';
// import { PLAYLIST } from '../../../mockApiData/csgoYoutube';
import { ReduxState } from '../redux-state';
import { ESportsTournament } from '../../../types/esports-api/esports-tournament.model';
import { ESportsMatch } from '../../../types/esports-api/esports-match.model';


// Data API
// Get Tournaments
export function getCsgoTournamentsRequest(): T.GetCsgoTournamentsRequest {
  return { type: C.GET_CSGO_TOURNAMENTS_REQUEST }
}
export function getCsgoTournamentsSuccess(payload, sortedTournaments): T.GetCsgoTournamentsSuccess {
  return {
    type:
      C.GET_CSGO_TOURNAMENTS_SUCCESS,
    payload,
    sortedTournaments
  }
}
export function getCsgoTournamentsFailure(err): T.GetCsgoTournamentsFailure {
  return { type: C.GET_CSGO_TOURNAMENTS_FAILURE, err }
}

// export const getCsgoTournaments = (): ThunkAction<
//   Promise<ESportsTournament[]>, ReduxState, null, T.CsgoActionTypes
// > => async (dispatch) => {
//   dispatch(getCsgoTournamentsRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.CSGO + gameonAPI.TOURNAMENTS)
//     .then(response => {
//       const sortedTournaments = sortESportsTournaments(response.data);
//       dispatch(getCsgoTournamentsSuccess(response.data, sortedTournaments));
//       return response.data
//     }).catch(err => {
//       dispatch(getCsgoTournamentsFailure(err));
//       // throw(err);
//     });
// };

// This uses mock data to reduce requests to api
export const getCsgoTournaments = (): ThunkAction<
  Promise<ESportsTournament[]>, ReduxState, null, T.CsgoActionTypes
> => async (dispatch) => {
  dispatch(getCsgoTournamentsRequest());
  await sleep(1000);
  const tournaments = TOURNAMENTS as ESportsTournament[];
  const sortedTournaments = sortESportsTournaments(tournaments);
  dispatch(getCsgoTournamentsSuccess(tournaments, sortedTournaments));
  return tournaments;
};

// Get Matches
export function getCsgoMatchesRequest(): T.GetCsgoMatchesRequest {
  return { type: C.GET_CSGO_MATCHES_REQUEST }
}
export function getCsgoMatchesSuccess(payload, matchesTeams): T.GetCsgoMatchesSuccess {
  return {
    type: C.GET_CSGO_MATCHES_SUCCESS,
    payload,
    matchesTeams
  }
}
export function getCsgoMatchesFailure(err): T.GetCsgoMatchesFailure {
  return { type: C.GET_CSGO_MATCHES_FAILURE, err }
}

// export const getCsgoMatches = (): ThunkAction<
//   Promise<ESportsMatch[]>, ReduxState, null, T.CsgoActionTypes
// > => async (dispatch) => {
//   dispatch(getCsgoMatchesRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.CSGO + gameonAPI.MATCHES)
//     .then(response => {
//       const matchesTeams = getESportsTeamsFromMatches(response.data);
//       const sortedMatches = sortESportByDate(response.data);
//       dispatch(getCsgoMatchesSuccess(sortedMatches, matchesTeams));
//       return response.data;
//     }).catch(err => {
//       dispatch(getCsgoMatchesFailure(err));
//     });
// };

export const getCsgoMatches = (): ThunkAction<
  Promise<ESportsMatch[]>, ReduxState, null, T.CsgoActionTypes
> => async (dispatch) => {
  dispatch(getCsgoMatchesRequest());
  await sleep(1000);
  const matches = MATCHES as ESportsMatch[];
  const matchesTeams = getESportsTeamsFromMatches(matches);
  dispatch(getCsgoMatchesSuccess(sortESportByDate(matches), matchesTeams));
  return matches;
};

// Get A Tournament's Matches
export function getCsgoTournamentMatchesRequest(): T.GetCsgoTournamentMatchesRequest {
  return { type: C.GET_CSGO_TOURNAMENT_MATCHES_REQUEST }
}
export function getCsgoTournamentMatchesSuccess(payload): T.GetCsgoTournamentMatchesSuccess {
  return { type: C.GET_CSGO_TOURNAMENT_MATCHES_SUCCESS, payload }
}
export function getCsgoTournamentMatchesFailure(err): T.GetCsgoTournamentMatchesFailure {
  return { type: C.GET_CSGO_TOURNAMENT_MATCHES_FAILURE, err }
}
export function clearCsgoTournamentMatchesSuccess(): T.ClearCsgoTournamentMatchesSuccess {
  return { type: C.CLEAR_CSGO_TOURNAMENT_MATCHES }
}

// export const getCsgoTournamentMatches = (tournamentId: string): ThunkAction<
//   Promise<void>, ReduxState, null, T.CsgoActionTypes
// > => async (dispatch) => {
//   dispatch(getCsgoTournamentMatchesRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.CSGO + gameonAPI.MATCHES, {
//     params: { 'tournamentId': tournamentId }
//   }).then(response => {
//     dispatch(getCsgoTournamentMatchesSuccess(response.data));
//   }).catch(err => {
//     dispatch(getCsgoTournamentMatchesFailure(err));
//   });
// };

export const getCsgoTournamentMatches = (tournamentId: string): ThunkAction<
  Promise<void>, ReduxState, null, T.CsgoActionTypes
> => async (dispatch) => {
  dispatch(getCsgoTournamentMatchesRequest());
  await sleep(1000);
  dispatch(getCsgoTournamentMatchesSuccess(TOURNAMENT_MATCHES));
};

export const clearCsgoTournamentMatches = (): ThunkAction<
  Promise<void>, ReduxState, null, T.CsgoActionTypes
> => async (dispatch) => {
  dispatch(clearCsgoTournamentMatchesSuccess());
}

// Get Series
// export function getCsgoSeriesRequest(): T.GetCsgoSeriesRequest {
//   return { type: C.GET_CSGO_SERIES_REQUEST }
// }
// export function getCsgoSeriesSuccess(payload, sortedSeries): T.GetCsgoSeriesSuccess {
//   return { type:
//     C.GET_CSGO_SERIES_SUCCESS,
//     payload,
//     sortedSeries
//   }
// }
// export function getCsgoSeriesFailure(err): T.GetCsgoSeriesFailure {
//   return { type: C.GET_CSGO_SERIES_FAILURE, err }
// }

// export function getCsgoSeries() {
//   return async function (dispatch) {
//     dispatch(getCsgoSeriesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.CSGO + gameonAPI.SERIES)
//       .then(response {
//         dispatch(getCsgoSeriesSuccess(response.data));
//       })
//       .catch(err {
//         dispatch(getCsgoSeriesFailure(err));
//         throw(err);
//       });
//   };
// };

// export function getCsgoSeries() {
//   return async function (dispatch) {
//     dispatch(getCsgoSeriesRequest());
//     await sleep(1000);
//     const sortedSeries = sortESportsSeries(SERIES);
//     return dispatch(getCsgoSeriesSuccess(SERIES, sortedSeries));
//   };
// };

// Get Teams
// export function getCsgoTeamsRequest(): T.GetCsgoTeamsRequest {
//   return { type: C.GET_CSGO_TEAMS_REQUEST }
// }
// export function getCsgoTeamsSuccess(payload): T.GetCsgoTeamsSuccess {
//   return { type: C.GET_CSGO_TEAMS_SUCCESS, payload }
// }
// export function getCsgoTeamsFailure(err): T.GetCsgoTeamsFailure {
//   return { type: C.GET_CSGO_TEAMS_FAILURE, err }
// }

// export const getCsgoTeams = (): ThunkAction<
//   Promise<T.CsgoActionTypes>, ReduxState, null, T.CsgoActionTypes
// > => async (dispatch) => {
//   dispatch(getCsgoTeamsRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.CSGO + gameonAPI.TEAMS)
//     .then(response => {
//       return dispatch(getCsgoTeamsSuccess(response.data));
//     })
//     .catch(err => {
//       return dispatch(getCsgoTeamsFailure(err));
//       // throw(err);
//     });
// };

// export const getCsgoTeams = (): ThunkAction<
//   Promise<T.CsgoActionTypes>, ReduxState, null, T.CsgoActionTypes
// > => async (dispatch) => {
//   dispatch(getCsgoTeamsRequest());
//   await sleep(1000);
//   return dispatch(getCsgoTeamsSuccess([]));
// };


// Get highlights from youtube
// export function getCsgoVideosRequest(): T.GetCsgoVideosRequest {
//   return { type: C.GET_CSGO_VIDEOS_REQUEST }
// }
// export function getCsgoVideosSuccess(payload): T.GetCsgoVideosSuccess {
//   return { type: C.GET_CSGO_VIDEOS_SUCCESS, payload }
// }
// export function getCsgoVideosFailure(err): T.GetCsgoVideosFailure {
//   return { type: C.GET_CSGO_VIDEOS_FAILURE, err }
// }

// export function getCsgoVideos() {
//   return async function (dispatch) {
//     dispatch(getCsgoVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.CSGO_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response {
//       dispatch(getCsgoVideosSuccess(response.data.items));
//     }).catch(err {
//       dispatch(getCsgoVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
// export const getCsgoVideos = (): ThunkAction<
//   Promise<T.CsgoActionTypes>, ReduxState, null, T.CsgoActionTypes
// > => async (dispatch) => {
//   dispatch(getCsgoVideosRequest());
//   await sleep(1000);
//   return dispatch(getCsgoVideosSuccess(PLAYLIST.items));
// };
