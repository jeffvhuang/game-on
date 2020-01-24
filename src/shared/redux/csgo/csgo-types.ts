import * as C from "./csgo-constants";
import { ESportsTournament } from "../../../types/esports-api/esports-tournament.model";
import { ESportsMatch } from "../../../types/esports-api/esports-match.model";
import { ESportsTeamBase } from "../../../types/esports-api/esports-team-base.model";
import { ESportsSortedTournaments } from "../../../types/esports-api/esports-sorted-tournaments.model";
import { ESportsTeam } from "../../../types/esports-api/esports-team.model";

export interface CsgoState {
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

// Get CSGO Tournaments
export interface GetCsgoTournamentsRequest {
  type: typeof C.GET_CSGO_TOURNAMENTS_REQUEST;
}

export interface GetCsgoTournamentsSuccess {
  type: typeof C.GET_CSGO_TOURNAMENTS_SUCCESS;
  payload: ESportsTournament[];
  sortedTournaments: ESportsSortedTournaments;
}

export interface GetCsgoTournamentsFailure {
  type: typeof C.GET_CSGO_TOURNAMENTS_FAILURE;
  err: any;
}

// Get CSGO Series
// export interface GetCsgoSeriesRequest {
//   type: typeof C.GET_CSGO_SERIES_REQUEST;
// }

// export interface GetCsgoSeriesSuccess {
//   type: typeof C.GET_CSGO_SERIES_SUCCESS;
//   payload: ESportsSeries[];
//   sortedSeries: ESportsSortedSeries;
// }

// export interface GetCsgoSeriesFailure {
//   type: typeof C.GET_CSGO_SERIES_FAILURE;
//   err: any;
// }

// Get a particular tournament's matches
export interface GetCsgoTournamentMatchesRequest {
  type: typeof C.GET_CSGO_TOURNAMENT_MATCHES_REQUEST;
}

export interface GetCsgoTournamentMatchesSuccess {
  type: typeof C.GET_CSGO_TOURNAMENT_MATCHES_SUCCESS;
  payload: ESportsMatch[]
}

export interface GetCsgoTournamentMatchesFailure {
  type: typeof C.GET_CSGO_TOURNAMENT_MATCHES_FAILURE;
  err: any;
}

export interface ClearCsgoTournamentMatchesSuccess {
  type: typeof C.CLEAR_CSGO_TOURNAMENT_MATCHES;
}

// Get most recent CSGO matches
export interface GetCsgoMatchesRequest {
  type: typeof C.GET_CSGO_MATCHES_REQUEST;
}

export interface GetCsgoMatchesSuccess {
  type: typeof C.GET_CSGO_MATCHES_SUCCESS;
  payload: ESportsMatch[];
  matchesTeams: ESportsTeamBase[]
}

export interface GetCsgoMatchesFailure {
  type: typeof C.GET_CSGO_MATCHES_FAILURE;
  err: any;
}

// Get Csgo Teams
// export interface GetCsgoTeamsRequest {
//   type: typeof C.GET_CSGO_TEAMS_REQUEST;
// }

// export interface GetCsgoTeamsSuccess {
//   type: typeof C.GET_CSGO_TEAMS_SUCCESS;
//   payload: ESportsTeam[];
// }

// export interface GetCsgoTeamsFailure {
//   type: typeof C.GET_CSGO_TEAMS_FAILURE;
//   err: any;
// }

export type CsgoActionTypes =
  GetCsgoTournamentsRequest |
  GetCsgoTournamentsSuccess |
  GetCsgoTournamentsFailure |
  GetCsgoTournamentMatchesRequest |
  GetCsgoTournamentMatchesSuccess |
  GetCsgoTournamentMatchesFailure |
  ClearCsgoTournamentMatchesSuccess |
  GetCsgoMatchesRequest |
  GetCsgoMatchesSuccess |
  GetCsgoMatchesFailure
  // GetCsgoSeriesRequest |
  // GetCsgoSeriesSuccess |
  // GetCsgoSeriesFailure |
  // GetCsgoTeamsRequest |
  // GetCsgoTeamsSuccess |
  // GetCsgoTeamsFailure