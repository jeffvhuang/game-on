import axios from "axios";
import { ThunkAction } from "redux-thunk";

import * as T from "./overwatch-types";
import * as C from "./overwatch-constants";
import { gameonAPI, env } from "../../../helpers/constants";
import {
  sleep,
  sortESportsTournaments,
  sortESportByDate,
  getESportsTeamsFromMatches
} from "../../../helpers/utils";
import { ReduxState } from "../redux-state";
import { ESportsTournament } from "../../../types/esports-api/esports-tournament.model";
import { ESportsMatch } from "../../../types/esports-api/esports-match.model";

// Temporary seed data
import TOURNAMENTS from "../../../mockApiData/overwatchTournaments.json";
import MATCHES from "../../../mockApiData/overwatchMatches.json";
import TOURNAMENT_MATCHES from "../../../mockApiData/overwatchTournamentMatches.json";

//#region Get Tournaments
export function getOverwatchTournamentsRequest(): T.GetOverwatchTournamentsRequest {
  return { type: C.GET_OVERWATCH_TOURNAMENTS_REQUEST };
}
export function getOverwatchTournamentsSuccess(
  payload,
  sortedTournaments
): T.GetOverwatchTournamentsSuccess {
  return {
    type: C.GET_OVERWATCH_TOURNAMENTS_SUCCESS,
    payload,
    sortedTournaments
  };
}
export function getOverwatchTournamentsFailure(
  err
): T.GetOverwatchTournamentsFailure {
  return { type: C.GET_OVERWATCH_TOURNAMENTS_FAILURE, err };
}

export const getOverwatchTournaments = (): ThunkAction<
  Promise<ESportsTournament[]>,
  ReduxState,
  null,
  T.OverwatchActionTypes
> => async dispatch => {
  dispatch(getOverwatchTournamentsRequest());
  if (env === "dev") {
    const tournaments = TOURNAMENTS as ESportsTournament[];
    const sortedTournaments = sortESportsTournaments(tournaments);
    dispatch(getOverwatchTournamentsSuccess(tournaments, sortedTournaments));
    return tournaments;
  }

  return axios
    .get(gameonAPI.HOST + gameonAPI.OVERWATCH + gameonAPI.TOURNAMENTS)
    .then(response => {
      const sortedTournaments = sortESportsTournaments(response.data);
      dispatch(
        getOverwatchTournamentsSuccess(response.data, sortedTournaments)
      );
      return response.data;
    })
    .catch(err => {
      dispatch(getOverwatchTournamentsFailure(err));
    });
};
//#endregion

//#region Get Matches
export function getOverwatchMatchesRequest(): T.GetOverwatchMatchesRequest {
  return { type: C.GET_OVERWATCH_MATCHES_REQUEST };
}
export function getOverwatchMatchesSuccess(
  payload,
  matchesTeams
): T.GetOverwatchMatchesSuccess {
  return {
    type: C.GET_OVERWATCH_MATCHES_SUCCESS,
    payload,
    matchesTeams
  };
}
export function getOverwatchMatchesFailure(err): T.GetOverwatchMatchesFailure {
  return { type: C.GET_OVERWATCH_MATCHES_FAILURE, err };
}

export const getOverwatchMatches = (): ThunkAction<
  Promise<ESportsMatch[]>,
  ReduxState,
  null,
  T.OverwatchActionTypes
> => async dispatch => {
  dispatch(getOverwatchMatchesRequest());
  if (env === "dev") {
    const matches = MATCHES as ESportsMatch[];
    const matchesTeams = getESportsTeamsFromMatches(matches);
    dispatch(
      getOverwatchMatchesSuccess(sortESportByDate(matches), matchesTeams)
    );
    return matches;
  }

  return axios
    .get(gameonAPI.HOST + gameonAPI.OVERWATCH + gameonAPI.MATCHES)
    .then(response => {
      const matchesTeams = getESportsTeamsFromMatches(response.data);
      const sortedMatches = sortESportByDate(response.data);
      dispatch(getOverwatchMatchesSuccess(sortedMatches, matchesTeams));
      return response.data;
    })
    .catch(err => {
      dispatch(getOverwatchMatchesFailure(err));
    });
};
//#endregion

//#region Get A Tournament's Matches
export function getOverwatchTournamentMatchesRequest(): T.GetOverwatchTournamentMatchesRequest {
  return { type: C.GET_OVERWATCH_TOURNAMENT_MATCHES_REQUEST };
}
export function getOverwatchTournamentMatchesSuccess(
  payload
): T.GetOverwatchTournamentMatchesSuccess {
  return { type: C.GET_OVERWATCH_TOURNAMENT_MATCHES_SUCCESS, payload };
}
export function getOverwatchTournamentMatchesFailure(
  err
): T.GetOverwatchTournamentMatchesFailure {
  return { type: C.GET_OVERWATCH_TOURNAMENT_MATCHES_FAILURE, err };
}
export function clearOverwatchTournamentMatchesSuccess(): T.ClearOverwatchTournamentMatchesSuccess {
  return { type: C.CLEAR_OVERWATCH_TOURNAMENT_MATCHES };
}

export const getOverwatchTournamentMatches = (
  tournamentId: string
): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.OverwatchActionTypes
> => async dispatch => {
  dispatch(getOverwatchTournamentMatchesRequest());
  if (env === "dev") {
    dispatch(getOverwatchTournamentMatchesSuccess(TOURNAMENT_MATCHES));
    return;
  }

  return axios
    .get(gameonAPI.HOST + gameonAPI.OVERWATCH + gameonAPI.MATCHES, {
      params: { tournamentId: tournamentId }
    })
    .then(response => {
      dispatch(getOverwatchTournamentMatchesSuccess(response.data));
    })
    .catch(err => {
      dispatch(getOverwatchTournamentMatchesFailure(err));
    });
};

export const clearOverwatchTournamentMatches = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.OverwatchActionTypes
> => async dispatch => {
  dispatch(clearOverwatchTournamentMatchesSuccess());
};
//#endregion
