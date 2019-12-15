import axios from "axios";
import { ThunkAction } from "redux-thunk";

import * as T from "./lol-types";
import * as C from "./lol-constants";
import { gameonAPI } from "../../../helpers/constants";
import {
  sleep,
  sortESportsTournaments,
  sortESportByDate,
  getESportsTeamsFromMatches
} from "../../../helpers/utils";

// Temporary seed data
import TOURNAMENTS from "../../../mockApiData/lolTournaments.json";
import MATCHES from "../../../mockApiData/lolMatches.json";
import TOURNAMENT_MATCHES from "../../../mockApiData/lolTournamentMatches.json";
import { ReduxState } from "../redux-state";
import { ESportsTournament } from "../../../types/esports-api/esports-tournament.model";
import { ESportsMatch } from "../../../types/esports-api/esports-match.model";

// Data API
// Get Tournaments
export function getLolTournamentsRequest(): T.GetLolTournamentsRequest {
  return { type: C.GET_LOL_TOURNAMENTS_REQUEST };
}
export function getLolTournamentsSuccess(
  payload,
  sortedTournaments
): T.GetLolTournamentsSuccess {
  return {
    type: C.GET_LOL_TOURNAMENTS_SUCCESS,
    payload,
    sortedTournaments
  };
}
export function getLolTournamentsFailure(err): T.GetLolTournamentsFailure {
  return { type: C.GET_LOL_TOURNAMENTS_FAILURE, err };
}

// export const getLolTournaments = (): ThunkAction<
//   Promise<ESportsTournament[]>, ReduxState, null, T.LolActionTypes
// > => async (dispatch) => {
//   dispatch(getLolTournamentsRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.LOL + gameonAPI.TOURNAMENTS)
//     .then(response => {
//       const sortedTournaments = sortESportsTournaments(response.data);
//       dispatch(getLolTournamentsSuccess(response.data, sortedTournaments));
//       return response.data
//     }).catch(err => {
//       dispatch(getLolTournamentsFailure(err));
//       // throw(err);
//     });
// };

// This uses mock data to reduce requests to api
export const getLolTournaments = (): ThunkAction<
  Promise<ESportsTournament[]>,
  ReduxState,
  null,
  T.LolActionTypes
> => async dispatch => {
  dispatch(getLolTournamentsRequest());
  await sleep(1000);
  const tournaments = TOURNAMENTS as ESportsTournament[];
  const sortedTournaments = sortESportsTournaments(tournaments);
  dispatch(getLolTournamentsSuccess(tournaments, sortedTournaments));
  return tournaments;
};

// Get Series
// export function getLolSeriesRequest(): T.GetLolSeriesRequest {
//   return { type: C.GET_LOL_SERIES_REQUEST }
// }
// export function getLolSeriesSuccess(payload, sortedSeries): T.GetLolSeriesSuccess {
//   return { type:
//     C.GET_LOL_SERIES_SUCCESS,
//     payload,
//     sortedSeries
//   }
// }
// export function getLolSeriesFailure(err): T.GetLolSeriesFailure {
//   return { type: C.GET_LOL_SERIES_FAILURE, err }
// }

// export function getLolSeries() {
//   return async function (dispatch) {
//     dispatch(getLolSeriesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.LOL + gameonAPI.SERIES)
//       .then(response {
//         dispatch(getLolSeriesSuccess(response.data));
//       })
//       .catch(err {
//         dispatch(getLolSeriesFailure(err));
//         throw(err);
//       });
//   };
// };

// export function getLolSeries() {
//   return async function (dispatch) {
//     dispatch(getLolSeriesRequest());
//     await sleep(1000);
//     const sortedSeries = sortESportsSeries(SERIES);
//     return dispatch(getLolSeriesSuccess(SERIES, sortedSeries));
//   };
// };

// Get Matches
export function getLolMatchesRequest(): T.GetLolMatchesRequest {
  return { type: C.GET_LOL_MATCHES_REQUEST };
}
export function getLolMatchesSuccess(
  payload,
  matchesTeams
): T.GetLolMatchesSuccess {
  return {
    type: C.GET_LOL_MATCHES_SUCCESS,
    payload,
    matchesTeams
  };
}
export function getLolMatchesFailure(err): T.GetLolMatchesFailure {
  return { type: C.GET_LOL_MATCHES_FAILURE, err };
}

// export const getLolMatches = (): ThunkAction<
//   Promise<ESportsMatch[]>, ReduxState, null, T.LolActionTypes
// > => async (dispatch) => {
//   dispatch(getLolMatchesRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.LOL + gameonAPI.MATCHES)
//     .then(response => {
//       const matchesTeams = getESportsTeamsFromMatches(response.data);
//       const sortedMatches = sortESportByDate(response.data);
//       dispatch(getLolMatchesSuccess(sortedMatches, matchesTeams));
//       return response.data;
//     }).catch(err => {
//       dispatch(getLolMatchesFailure(err));
//       // throw (err);
//     });
// };

export const getLolMatches = (): ThunkAction<
  Promise<ESportsMatch[]>,
  ReduxState,
  null,
  T.LolActionTypes
> => async dispatch => {
  dispatch(getLolMatchesRequest());
  await sleep(1000);
  const matches = MATCHES as ESportsMatch[];
  const matchesTeams = getESportsTeamsFromMatches(matches);
  dispatch(getLolMatchesSuccess(sortESportByDate(matches), matchesTeams));
  return matches;
};

// Get A Tournament's Matches
export function getLolTournamentMatchesRequest(): T.GetLolTournamentMatchesRequest {
  return { type: C.GET_LOL_TOURNAMENT_MATCHES_REQUEST };
}
export function getLolTournamentMatchesSuccess(
  payload
): T.GetLolTournamentMatchesSuccess {
  return { type: C.GET_LOL_TOURNAMENT_MATCHES_SUCCESS, payload };
}
export function getLolTournamentMatchesFailure(
  err
): T.GetLolTournamentMatchesFailure {
  return { type: C.GET_LOL_TOURNAMENT_MATCHES_FAILURE, err };
}
export function clearLolTournamentMatchesSuccess(): T.ClearLolTournamentMatchesSuccess {
  return { type: C.CLEAR_LOL_TOURNAMENT_MATCHES };
}

// export const getLolTournamentMatches = (tournamentId: string): ThunkAction<
//   Promise<T.LolActionTypes>, ReduxState, null, T.LolActionTypes
// > => async (dispatch) => {
//   dispatch(getLolTournamentMatchesRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.LOL + gameonAPI.MATCHES, {
//     params: { 'tournamentId': tournamentId }
//   }).then(response => {
//     return dispatch(getLolTournamentMatchesSuccess(response.data));
//   }).catch(err => {
//     return dispatch(getLolTournamentMatchesFailure(err));
//     // throw (err);
//   });
// };

export const getLolTournamentMatches = (
  tournamentId: string
): ThunkAction<
  Promise<T.LolActionTypes>,
  ReduxState,
  null,
  T.LolActionTypes
> => async dispatch => {
  dispatch(getLolTournamentMatchesRequest());
  await sleep(1000);
  return dispatch(getLolTournamentMatchesSuccess(TOURNAMENT_MATCHES));
};

export const clearLolTournamentMatches = (): ThunkAction<
  T.LolActionTypes,
  ReduxState,
  null,
  T.LolActionTypes
> => dispatch => {
  return dispatch(clearLolTournamentMatchesSuccess());
};

// Get Teams
export function getLolTeamsRequest(): T.GetLolTeamsRequest {
  return { type: C.GET_LOL_TEAMS_REQUEST };
}
export function getLolTeamsSuccess(payload): T.GetLolTeamsSuccess {
  return { type: C.GET_LOL_TEAMS_SUCCESS, payload };
}
export function getLolTeamsFailure(err): T.GetLolTeamsFailure {
  return { type: C.GET_LOL_TEAMS_FAILURE, err };
}

// export const getLolTeams = (): ThunkAction<
//   Promise<T.LolActionTypes>, ReduxState, null, T.LolActionTypes
// > => async (dispatch) => {
//   dispatch(getLolTeamsRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.LOL + gameonAPI.TEAMS)
//     .then(response => {
//       return dispatch(getLolTeamsSuccess(response.data));
//     })
//     .catch(err => {
//       return dispatch(getLolTeamsFailure(err));
//       // throw(err);
//     });
// };

export const getLolTeams = (): ThunkAction<
  Promise<T.LolActionTypes>,
  ReduxState,
  null,
  T.LolActionTypes
> => async dispatch => {
  dispatch(getLolTeamsRequest());
  await sleep(1000);
  return dispatch(getLolTeamsSuccess([]));
};
