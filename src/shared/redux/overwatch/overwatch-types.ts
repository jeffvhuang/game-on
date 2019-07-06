import * as C from "./overwatch-constants";
import { ESportsTournament } from "../../../types/esports-api/esports-tournament.model";
import { ESportsMatch } from "../../../types/esports-api/esports-match.model";
import { ESportsTeamBase } from "../../../types/esports-api/esports-team-base.model";
import { ESportsSortedTournaments } from "../../../types/esports-api/esports-sorted-tournaments.model";

export interface OverwatchState {
  isFetching: boolean,
  tournaments: ESportsTournament[],
  ongoing: ESportsTournament[],
  upcoming: ESportsTournament[],
  completed: ESportsTournament[],
  matches: ESportsMatch[],
  tournamentMatches: ESportsMatch[],
  teams: ESportsTeamBase[],
  matchesTeams: ESportsTeamBase[],
  error: any
}

// Get Overwatch Tournaments
export interface GetOverwatchTournamentsRequest {
  type: typeof C.GET_OVERWATCH_TOURNAMENTS_REQUEST;
}

export interface GetOverwatchTournamentsSuccess {
  type: typeof C.GET_OVERWATCH_TOURNAMENTS_SUCCESS;
  payload: ESportsTournament[];
  sortedTournaments: ESportsSortedTournaments;
}

export interface GetOverwatchTournamentsFailure {
  type: typeof C.GET_OVERWATCH_TOURNAMENTS_FAILURE;
  err: any;
}

// Get a particular tournament's matches
export interface GetOverwatchTournamentMatchesRequest {
  type: typeof C.GET_OVERWATCH_TOURNAMENT_MATCHES_REQUEST;
}

export interface GetOverwatchTournamentMatchesSuccess {
  type: typeof C.GET_OVERWATCH_TOURNAMENT_MATCHES_SUCCESS;
  payload: ESportsMatch[]
}

export interface GetOverwatchTournamentMatchesFailure {
  type: typeof C.GET_OVERWATCH_TOURNAMENT_MATCHES_FAILURE;
  err: any;
}

export interface ClearOverwatchTournamentMatchesSuccess {
  type: typeof C.CLEAR_OVERWATCH_TOURNAMENT_MATCHES;
}

// Get most recent OVERWATCH matches
export interface GetOverwatchMatchesRequest {
  type: typeof C.GET_OVERWATCH_MATCHES_REQUEST;
}

export interface GetOverwatchMatchesSuccess {
  type: typeof C.GET_OVERWATCH_MATCHES_SUCCESS;
  payload: ESportsMatch[];
  matchesTeams: ESportsTeamBase[]
}

export interface GetOverwatchMatchesFailure {
  type: typeof C.GET_OVERWATCH_MATCHES_FAILURE;
  err: any;
}

export type OverwatchActionTypes =
  GetOverwatchTournamentsRequest |
  GetOverwatchTournamentsSuccess |
  GetOverwatchTournamentsFailure |
  GetOverwatchTournamentMatchesRequest |
  GetOverwatchTournamentMatchesSuccess |
  GetOverwatchTournamentMatchesFailure |
  ClearOverwatchTournamentMatchesSuccess |
  GetOverwatchMatchesRequest |
  GetOverwatchMatchesSuccess |
  GetOverwatchMatchesFailure