import * as C from "./lol-constants";
import { ESportsTournament } from "../../../types/esports-api/esports-tournament.model";
import { ESportsMatch } from "../../../types/esports-api/esports-match.model";
import { ESportsTeamBase } from "../../../types/esports-api/esports-team-base.model";
import { ESportsSortedTournaments } from "../../../types/esports-api/esports-sorted-tournaments.model";
import { ESportsTeam } from "../../../types/esports-api/esports-team.model";
import { ESportsSeries } from "../../../types/esports-api/esports-series.model";

export interface LolState {
  isFetching: boolean;
  series: ESportsSeries[];
  selectedSeriesTournaments: ESportsTournament[];
  tournaments: ESportsTournament[];
  ongoing: ESportsTournament[];
  upcoming: ESportsTournament[];
  completed: ESportsTournament[];
  matches: ESportsMatch[];
  tournamentMatches: ESportsMatch[];
  teams: ESportsTeamBase[];
  matchesTeams: ESportsTeamBase[];
  error: any;
}

// Get LOL Tournaments
export interface GetLolTournamentsRequest {
  type: typeof C.GET_LOL_TOURNAMENTS_REQUEST;
}

export interface GetLolTournamentsSuccess {
  type: typeof C.GET_LOL_TOURNAMENTS_SUCCESS;
  payload: ESportsTournament[];
  sortedTournaments: ESportsSortedTournaments;
}

export interface GetLolTournamentsFailure {
  type: typeof C.GET_LOL_TOURNAMENTS_FAILURE;
  err: any;
}

// Get LOL Series
export interface GetLolSeriesRequest {
  type: typeof C.GET_LOL_SERIES_REQUEST;
}

export interface GetLolSeriesSuccess {
  type: typeof C.GET_LOL_SERIES_SUCCESS;
  payload: ESportsSeries[];
}

export interface GetLolSeriesFailure {
  type: typeof C.GET_LOL_SERIES_FAILURE;
  err: any;
}

export interface SelectLolSeries {
  type: typeof C.SELECT_LOL_SERIES;
  payload: ESportsSeries;
}

export interface GetLolSeriesTournamentsRequest {
  type: typeof C.GET_LOL_SERIES_TOURNAMENTS_REQUEST;
}

export interface GetLolSeriesTournamentsSuccess {
  type: typeof C.GET_LOL_SERIES_TOURNAMENTS_SUCCESS;
  payload: ESportsTournament[];
}

export interface GetLolSeriesTournamentsFailure {
  type: typeof C.GET_LOL_SERIES_TOURNAMENTS_FAILURE;
  err: any;
}

// Get a particular tournament's matches
export interface GetLolTournamentMatchesRequest {
  type: typeof C.GET_LOL_TOURNAMENT_MATCHES_REQUEST;
}

export interface GetLolTournamentMatchesSuccess {
  type: typeof C.GET_LOL_TOURNAMENT_MATCHES_SUCCESS;
  payload: ESportsMatch[];
}

export interface GetLolTournamentMatchesFailure {
  type: typeof C.GET_LOL_TOURNAMENT_MATCHES_FAILURE;
  err: any;
}

export interface ClearLolTournamentMatchesSuccess {
  type: typeof C.CLEAR_LOL_TOURNAMENT_MATCHES;
}

// Get most recent LOL matches
export interface GetLolMatchesRequest {
  type: typeof C.GET_LOL_MATCHES_REQUEST;
}

export interface GetLolMatchesSuccess {
  type: typeof C.GET_LOL_MATCHES_SUCCESS;
  payload: ESportsMatch[];
  matchesTeams: ESportsTeamBase[];
}

export interface GetLolMatchesFailure {
  type: typeof C.GET_LOL_MATCHES_FAILURE;
  err: any;
}

// Get Lol Teams
export interface GetLolTeamsRequest {
  type: typeof C.GET_LOL_TEAMS_REQUEST;
}

export interface GetLolTeamsSuccess {
  type: typeof C.GET_LOL_TEAMS_SUCCESS;
  payload: ESportsTeam[];
}

export interface GetLolTeamsFailure {
  type: typeof C.GET_LOL_TEAMS_FAILURE;
  err: any;
}

export type LolActionTypes =
  | GetLolTournamentsRequest
  | GetLolTournamentsSuccess
  | GetLolTournamentsFailure
  | GetLolSeriesRequest
  | GetLolSeriesSuccess
  | GetLolSeriesFailure
  | GetLolTournamentMatchesRequest
  | GetLolTournamentMatchesSuccess
  | GetLolTournamentMatchesFailure
  | ClearLolTournamentMatchesSuccess
  | GetLolMatchesRequest
  | GetLolMatchesSuccess
  | GetLolMatchesFailure
  | GetLolTeamsRequest
  | GetLolTeamsSuccess
  | GetLolTeamsFailure
  | SelectLolSeries
  | GetLolSeriesTournamentsRequest
  | GetLolSeriesTournamentsSuccess
  | GetLolSeriesTournamentsFailure;
