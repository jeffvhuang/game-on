import * as C from "./dota-constants";
import { ESportsTournament } from "../../../types/esports-api/esports-tournament.model";
import { ESportsSeries } from "../../../types/esports-api/esports-series.model";
import { ESportsMatch } from "../../../types/esports-api/esports-match.model";
import { ESportsTeamBase } from "../../../types/esports-api/esports-team-base.model";
import { ESportsSortedTournaments } from "../../../types/esports-api/esports-sorted-tournaments.model";
import { ESportsTeam } from "../../../types/esports-api/esports-team.model";

export interface DotaState {
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

// Get DOTA Tournaments
export interface GetDotaTournamentsRequest {
  type: typeof C.GET_DOTA_TOURNAMENTS_REQUEST;
}

export interface GetDotaTournamentsSuccess {
  type: typeof C.GET_DOTA_TOURNAMENTS_SUCCESS;
  payload: ESportsTournament[];
  sortedTournaments: ESportsSortedTournaments;
}

export interface GetDotaTournamentsFailure {
  type: typeof C.GET_DOTA_TOURNAMENTS_FAILURE;
  err: any;
}

// Get DOTA Series
export interface GetDotaSeriesRequest {
  type: typeof C.GET_DOTA_SERIES_REQUEST;
}

export interface GetDotaSeriesSuccess {
  type: typeof C.GET_DOTA_SERIES_SUCCESS;
  payload: ESportsSeries[];
}

export interface GetDotaSeriesFailure {
  type: typeof C.GET_DOTA_SERIES_FAILURE;
  err: any;
}

// Get a particular tournament's matches
export interface GetDotaTournamentMatchesRequest {
  type: typeof C.GET_DOTA_TOURNAMENT_MATCHES_REQUEST;
}

export interface GetDotaTournamentMatchesSuccess {
  type: typeof C.GET_DOTA_TOURNAMENT_MATCHES_SUCCESS;
  payload: ESportsMatch[];
}

export interface GetDotaTournamentMatchesFailure {
  type: typeof C.GET_DOTA_TOURNAMENT_MATCHES_FAILURE;
  err: any;
}

export interface ClearDotaTournamentMatchesSuccess {
  type: typeof C.CLEAR_DOTA_TOURNAMENT_MATCHES;
}

// Get most recent DOTA matches
export interface GetDotaMatchesRequest {
  type: typeof C.GET_DOTA_MATCHES_REQUEST;
}

export interface GetDotaMatchesSuccess {
  type: typeof C.GET_DOTA_MATCHES_SUCCESS;
  payload: ESportsMatch[];
  matchesTeams: ESportsTeamBase[];
}

export interface GetDotaMatchesFailure {
  type: typeof C.GET_DOTA_MATCHES_FAILURE;
  err: any;
}

// Get Dota Teams
export interface GetDotaTeamsRequest {
  type: typeof C.GET_DOTA_TEAMS_REQUEST;
}

export interface GetDotaTeamsSuccess {
  type: typeof C.GET_DOTA_TEAMS_SUCCESS;
  payload: ESportsTeam[];
}

export interface GetDotaTeamsFailure {
  type: typeof C.GET_DOTA_TEAMS_FAILURE;
  err: any;
}

export interface SelectDotaSeries {
  type: typeof C.SELECT_DOTA_SERIES;
  payload: ESportsSeries;
}

export interface GetDotaSeriesTournamentsRequest {
  type: typeof C.GET_DOTA_SERIES_TOURNAMENTS_REQUEST;
}

export interface GetDotaSeriesTournamentsSuccess {
  type: typeof C.GET_DOTA_SERIES_TOURNAMENTS_SUCCESS;
  payload: ESportsTournament[];
}

export interface GetDotaSeriesTournamentsFailure {
  type: typeof C.GET_DOTA_SERIES_TOURNAMENTS_FAILURE;
  err: any;
}

export type DotaActionTypes =
  | GetDotaTournamentsRequest
  | GetDotaTournamentsSuccess
  | GetDotaTournamentsFailure
  | GetDotaSeriesRequest
  | GetDotaSeriesSuccess
  | GetDotaSeriesFailure
  | GetDotaTournamentMatchesRequest
  | GetDotaTournamentMatchesSuccess
  | GetDotaTournamentMatchesFailure
  | ClearDotaTournamentMatchesSuccess
  | GetDotaMatchesRequest
  | GetDotaMatchesSuccess
  | GetDotaMatchesFailure
  | GetDotaTeamsRequest
  | GetDotaTeamsSuccess
  | GetDotaTeamsFailure
  | SelectDotaSeries
  | GetDotaSeriesTournamentsRequest
  | GetDotaSeriesTournamentsSuccess
  | GetDotaSeriesTournamentsFailure;
