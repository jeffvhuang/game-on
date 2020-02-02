import * as C from "./tennis-constants";
import { TennisTournament } from "../../../types/tennis-api/tennis-tournament.model";
import { TennisSortedTournaments } from "../../../types/tennis-api/tennis-sorted-tournaments.model";
import { TennisMatch } from "../../../types/tennis-api/tennis-match.model";
import { TennisTournamentInfo } from "../../../types/tennis-api/tennis-tournament-info.model";
import { TennisSortedMatches } from "../../../types/tennis-api/tennis-sorted-matches.model";
import { RoundMatches } from "../../../types/tennis-api/round-matches.model";

export interface TennisState {
  isFetching: boolean,
  tournaments: TennisTournament[],
  ongoing: TennisTournament[],
  upcoming: TennisTournament[],
  completed: TennisTournament[],
  matches: TennisMatch[],
  liveMatches: TennisMatch[],
  upcomingMatches: TennisMatch[],
  completedMatches: TennisMatch[],
  tournamentSchedule: TennisMatch[],
  tournamentRounds: RoundMatches[],
  tournamentInfo: TennisTournamentInfo,
  error: any
}

// Get TENNIS Tournaments
export interface GetTennisTournamentsRequest {
  type: typeof C.GET_TENNIS_TOURNAMENTS_REQUEST;
}

export interface GetTennisTournamentsSuccess {
  type: typeof C.GET_TENNIS_TOURNAMENTS_SUCCESS;
  payload: TennisTournament[];
  sortedTournaments: TennisSortedTournaments;
}

export interface GetTennisTournamentsFailure {
  type: typeof C.GET_TENNIS_TOURNAMENTS_FAILURE;
  err: any;
}

// Get a particular tournament's schedule Schedule
export interface GetTennisTournamentScheduleRequest {
  type: typeof C.GET_TENNIS_TOURNAMENT_SCHEDULE_REQUEST;
}

export interface GetTennisTournamentScheduleSuccess {
  type: typeof C.GET_TENNIS_TOURNAMENT_SCHEDULE_SUCCESS;
  payload: TennisMatch[];
}

export interface GetTennisTournamentScheduleFailure {
  type: typeof C.GET_TENNIS_TOURNAMENT_SCHEDULE_FAILURE;
  err: any;
}

export interface ClearTennisTournamentScheduleSuccess {
  type: typeof C.CLEAR_TENNIS_TOURNAMENT_SCHEDULE;
}

// Get A particular tournament's info
export interface GetTennisTournamentInfoRequest {
  type: typeof C.GET_TENNIS_TOURNAMENT_INFO_REQUEST;
}

export interface GetTennisTournamentInfoSuccess {
  type: typeof C.GET_TENNIS_TOURNAMENT_INFO_SUCCESS;
  payload: TennisTournamentInfo;
}

export interface GetTennisTournamentInfoFailure {
  type: typeof C.GET_TENNIS_TOURNAMENT_INFO_FAILURE;
  err: any;
}

export interface ClearTennisTournamentInfoSuccess {
  type: typeof C.CLEAR_TENNIS_TOURNAMENT_INFO;
}

// Get Tennis Matches
export interface GetTennisMatchesRequest {
  type: typeof C.GET_TENNIS_MATCHES_REQUEST;
}

export interface GetTennisMatchesSuccess {
  type: typeof C.GET_TENNIS_MATCHES_SUCCESS;
  payload: TennisMatch[];
  sortedMatches: TennisSortedMatches;
}

export interface GetTennisMatchesFailure {
  type: typeof C.GET_TENNIS_MATCHES_FAILURE;
  err: any;
}

export type TennisActionTypes =
  GetTennisTournamentsRequest |
  GetTennisTournamentsSuccess |
  GetTennisTournamentsFailure |
  GetTennisTournamentScheduleRequest |
  GetTennisTournamentScheduleSuccess |
  GetTennisTournamentScheduleFailure |
  ClearTennisTournamentScheduleSuccess |
  GetTennisTournamentInfoRequest |
  GetTennisTournamentInfoSuccess |
  GetTennisTournamentInfoFailure |
  ClearTennisTournamentInfoSuccess |
  GetTennisMatchesRequest |
  GetTennisMatchesSuccess |
  GetTennisMatchesFailure