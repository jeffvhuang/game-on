import axios from "axios";
import { ThunkAction } from "redux-thunk";

import * as T from "./lol-types";
import * as C from "./lol-constants";
import { gameonAPI, env } from "../../../helpers/constants";
import {
  sleep,
  sortESportsTournaments,
  sortESportByDate,
  getESportsTeamsFromMatches
} from "../../../helpers/utils";

// Temporary seed data
import SERIES from "../../../mockApiData/lolSeries.json";
import SERIES_TOURNAMENTS from "../../../mockApiData/lolSeriesTournaments.json";
import TOURNAMENTS from "../../../mockApiData/lolTournaments.json";
import MATCHES from "../../../mockApiData/lolMatches.json";
import TOURNAMENT_MATCHES from "../../../mockApiData/lolTournamentMatches.json";
import { ReduxState } from "../redux-state";
import { ESportsTournament } from "../../../types/esports-api/esports-tournament.model";
import { ESportsMatch } from "../../../types/esports-api/esports-match.model";
import { ESportsSeries } from "../../../types/esports-api/esports-series.model";

// Data API
//#region Get Series (multiple)
export function getLolSeriesRequest(): T.GetLolSeriesRequest {
  return { type: C.GET_LOL_SERIES_REQUEST };
}
export function getLolSeriesSuccess(payload): T.GetLolSeriesSuccess {
  return { type: C.GET_LOL_SERIES_SUCCESS, payload };
}
export function getLolSeriesFailure(err): T.GetLolSeriesFailure {
  return { type: C.GET_LOL_SERIES_FAILURE, err };
}

export const getLolSeries = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.LolActionTypes
> => async dispatch => {
  dispatch(getLolSeriesRequest());
  if (env === "dev") {
    const series = SERIES as ESportsSeries[];
    dispatch(getLolSeriesSuccess(series));
    return;
  }
  // api/lol/series
  return axios
    .get(gameonAPI.HOST + gameonAPI.LOL + gameonAPI.SERIES)
    .then(response => {
      dispatch(getLolSeriesSuccess(response.data));
    })
    .catch(err => {
      dispatch(getLolSeriesFailure(err));
    });
};
//#endregion

//#region get Lol (single) Series details
export function getLolSeriesTournamentsRequest(): T.GetLolSeriesTournamentsRequest {
  return { type: C.GET_LOL_SERIES_TOURNAMENTS_REQUEST };
}
export function getLolSeriesTournamentsSuccess(
  payload
): T.GetLolSeriesTournamentsSuccess {
  return {
    type: C.GET_LOL_SERIES_TOURNAMENTS_SUCCESS,
    payload
  };
}
export function getLolSeriesTournamentsFailure(
  err
): T.GetLolSeriesTournamentsFailure {
  return { type: C.GET_LOL_SERIES_TOURNAMENTS_FAILURE, err };
}

export const getLolSeriesTournaments = (
  seriesId: number
): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.LolActionTypes
> => async dispatch => {
  dispatch(getLolSeriesTournamentsRequest());
  if (env === "dev") {
    dispatch(getLolSeriesTournamentsSuccess(SERIES_TOURNAMENTS));
    return;
  }
  // /api/dota/tournaments
  return axios
    .get(
      `${gameonAPI.HOST}${gameonAPI.LOL}${
        gameonAPI.TOURNAMENTS
      }?seriesId=${seriesId}`
    )
    .then(response => {
      dispatch(getLolSeriesTournamentsSuccess(response.data));
    })
    .catch(err => {
      dispatch(getLolSeriesTournamentsFailure(err));
    });
};
//endregion

//#region Get Tournaments
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
//#endregion

//#region Get Matches
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
//#endregion

//#region Get A Tournament's Matches
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
//#endregion

//#region Get Teams
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
//#endregion
