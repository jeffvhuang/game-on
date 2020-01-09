import axios from "axios";

import * as T from "./dota-types";
import * as C from "./dota-constants";
import { gameonAPI } from "../../../helpers/constants";
import {
  sleep,
  sortESportsTournaments,
  sortESportByDate,
  getESportsTeamsFromMatches,
  sortESportsSeries
} from "../../../helpers/utils";

// Temporary seed data
import TOURNAMENTS from "../../../mockApiData/dotaTournaments.json";
import SERIES from "../../../mockApiData/dotaSeries.json";
import MATCHES from "../../../mockApiData/dotaMatches.json";
import TOURNAMENT_MATCHES from "../../../mockApiData/dotaTournamentMatches.json";
// import TEAMS from '../../../mockApiData/dotaTeams.json';
import { ThunkAction } from "redux-thunk";
import { ReduxState } from "../redux-state";
import { ESportsTournament } from "../../../types/esports-api/esports-tournament.model";
import { ESportsSeries } from "../../../types/esports-api/esports-series.model";
import { ESportsMatch } from "../../../types/esports-api/esports-match.model";

// Data API
// Get Tournaments
export function getDotaTournamentsRequest(): T.GetDotaTournamentsRequest {
  return { type: C.GET_DOTA_TOURNAMENTS_REQUEST };
}
export function getDotaTournamentsSuccess(
  payload,
  sortedTournaments
): T.GetDotaTournamentsSuccess {
  return {
    type: C.GET_DOTA_TOURNAMENTS_SUCCESS,
    payload,
    sortedTournaments
  };
}
export function getDotaTournamentsFailure(err): T.GetDotaTournamentsFailure {
  return { type: C.GET_DOTA_TOURNAMENTS_FAILURE, err };
}

// export const getDotaTournaments = (): ThunkAction<
//   Promise<ESportsTournament[]>, ReduxState, null, T.DotaActionTypes
// > => async (dispatch) => {
//   dispatch(getDotaTournamentsRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.DOTA + gameonAPI.TOURNAMENTS)
//     .then(response => {
//       const sortedTournaments = sortESportsTournaments(response.data);
//       dispatch(getDotaTournamentsSuccess(response.data, sortedTournaments));
//       return response.data
//     })
//     .catch(err => {
//       dispatch(getDotaTournamentsFailure(err));
//     });
// };

// This uses mock data to reduce requests to api
export const getDotaTournaments = (): ThunkAction<
  Promise<ESportsTournament[]>,
  ReduxState,
  null,
  T.DotaActionTypes
> => async dispatch => {
  dispatch(getDotaTournamentsRequest());
  await sleep(1000);
  const tournaments = TOURNAMENTS as ESportsTournament[];
  const sortedTournaments = sortESportsTournaments(tournaments);
  dispatch(getDotaTournamentsSuccess(TOURNAMENTS, sortedTournaments));
  return tournaments;
};

// Get Series
export function getDotaSeriesRequest(): T.GetDotaSeriesRequest {
  return { type: C.GET_DOTA_SERIES_REQUEST };
}
export function getDotaSeriesSuccess(
  payload,
  sortedSeries
): T.GetDotaSeriesSuccess {
  return {
    type: C.GET_DOTA_SERIES_SUCCESS,
    payload,
    sortedSeries
  };
}
export function getDotaSeriesFailure(err): T.GetDotaSeriesFailure {
  return { type: C.GET_DOTA_SERIES_FAILURE, err };
}

// export const getDotaSeries = (): ThunkAction<
//   Promise<void>, ReduxState, null, T.DotaActionTypes
// > => async (dispatch) => {
//   dispatch(getDotaSeriesRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.DOTA + gameonAPI.SERIES)
//     .then(response => {
//       const sortedSeries = sortESportsSeries(response.data);
//       dispatch(getDotaSeriesSuccess(response.data, sortedSeries));
//     })
//     .catch(err => {
//       dispatch(getDotaSeriesFailure(err));
//     });
// };

export const getDotaSeries = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.DotaActionTypes
> => async dispatch => {
  dispatch(getDotaSeriesRequest());
  await sleep(1000);
  const series = SERIES as ESportsSeries[];
  const sortedSeries = sortESportsSeries(series);
  dispatch(getDotaSeriesSuccess(series, sortedSeries));
};

// Get Matches
export function getDotaMatchesRequest(): T.GetDotaMatchesRequest {
  return { type: C.GET_DOTA_MATCHES_REQUEST };
}
export function getDotaMatchesSuccess(
  payload,
  matchesTeams
): T.GetDotaMatchesSuccess {
  return {
    type: C.GET_DOTA_MATCHES_SUCCESS,
    payload,
    matchesTeams
  };
}
export function getDotaMatchesFailure(err): T.GetDotaMatchesFailure {
  return { type: C.GET_DOTA_MATCHES_FAILURE, err };
}

// export const getDotaMatches = (): ThunkAction<
//   Promise<ESportsMatch[]>, ReduxState, null, T.DotaActionTypes
// > => async (dispatch) => {
//   dispatch(getDotaMatchesRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.DOTA + gameonAPI.MATCHES)
//     .then(response => {
//       const matchesTeams = getESportsTeamsFromMatches(response.data);
//       dispatch(getDotaMatchesSuccess(sortESportByDate(response.data), matchesTeams));
//       return response.data;
//     })
//     .catch(err => {
//       dispatch(getDotaMatchesFailure(err));
//     });
// };

export const getDotaMatches = (): ThunkAction<
  Promise<ESportsMatch[]>,
  ReduxState,
  null,
  T.DotaActionTypes
> => async dispatch => {
  dispatch(getDotaMatchesRequest());
  await sleep(1000);
  const matches = MATCHES as ESportsMatch[];
  const matchesTeams = getESportsTeamsFromMatches(matches);
  dispatch(getDotaMatchesSuccess(sortESportByDate(MATCHES), matchesTeams));
  return matches;
};

// Get A Tournament's Matches
export function getDotaTournamentMatchesRequest(): T.GetDotaTournamentMatchesRequest {
  return { type: C.GET_DOTA_TOURNAMENT_MATCHES_REQUEST };
}
export function getDotaTournamentMatchesSuccess(
  payload
): T.GetDotaTournamentMatchesSuccess {
  return { type: C.GET_DOTA_TOURNAMENT_MATCHES_SUCCESS, payload };
}
export function getDotaTournamentMatchesFailure(
  err
): T.GetDotaTournamentMatchesFailure {
  return { type: C.GET_DOTA_TOURNAMENT_MATCHES_FAILURE, err };
}
export function clearDotaTournamentMatchesSuccess(): T.ClearDotaTournamentMatchesSuccess {
  return { type: C.CLEAR_DOTA_TOURNAMENT_MATCHES };
}

// export const getDotaTournamentMatches = (tournamentId): ThunkAction<
//   Promise<void>, ReduxState, null, T.DotaActionTypes
// > => async (dispatch) => {
//   dispatch(getDotaTournamentMatchesRequest());
//    // /dota/matches
//   return axios.get(gameonAPI.HOST + gameonAPI.DOTA + gameonAPI.MATCHES, {
//     params: { 'tournamentId': tournamentId }
//   }).then(response => {
//     dispatch(getDotaTournamentMatchesSuccess(response.data));
//   }).catch(err => {
//     dispatch(getDotaTournamentMatchesFailure(err));
//   });
// };

export const getDotaTournamentMatches = (
  tournamentId
): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.DotaActionTypes
> => async dispatch => {
  dispatch(getDotaTournamentMatchesRequest());
  await sleep(1000);
  dispatch(getDotaTournamentMatchesSuccess(TOURNAMENT_MATCHES));
};

export const clearDotaTournamentMatches = (): ThunkAction<
  T.DotaActionTypes,
  ReduxState,
  null,
  T.DotaActionTypes
> => dispatch => {
  return dispatch(clearDotaTournamentMatchesSuccess());
};

// Get Teams
export function getDotaTeamsRequest(): T.GetDotaTeamsRequest {
  return { type: C.GET_DOTA_TEAMS_REQUEST };
}
export function getDotaTeamsSuccess(payload): T.GetDotaTeamsSuccess {
  return { type: C.GET_DOTA_TEAMS_SUCCESS, payload };
}
export function getDotaTeamsFailure(err): T.GetDotaTeamsFailure {
  return { type: C.GET_DOTA_TEAMS_FAILURE, err };
}

// export const getDotaTeams = (): ThunkAction<
//   Promise<void>, ReduxState, null, T.DotaActionTypes
// > => async (dispatch) => {
//   dispatch(getDotaTeamsRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.DOTA + gameonAPI.TEAMS)
//     .then(response => {
//       dispatch(getDotaTeamsSuccess(response.data));
//     })
//     .catch(err => {
//       dispatch(getDotaTeamsFailure(err));
//     });
// };

export const getDotaTeams = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.DotaActionTypes
> => async dispatch => {
  dispatch(getDotaTeamsRequest());
  await sleep(1000);
  dispatch(getDotaTeamsSuccess([]));
};

export const selectDotaSeries = (
  series: ESportsSeries
): ThunkAction<
  T.DotaActionTypes,
  ReduxState,
  null,
  T.DotaActionTypes
> => dispatch => {
  return dispatch({ type: C.SELECT_DOTA_SERIES, payload: series });
};

export const getDotaSeriesMatches = (
  tournamentIds: number[]
): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.DotaActionTypes
> => async dispatch => {
  // dispatch(getDotaTeamsRequest());
  // await sleep(1000);
  // dispatch(getDotaTeamsSuccess([]));
};
