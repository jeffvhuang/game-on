import * as C from "./champions-league-constants";
import { FootballSchedule } from "../../../../types/football-api/football-schedule.model";
import { FootballSortedSchedule } from "../../../../types/football-api/football-sorted-schedule.model";
import { FootballTeam } from "../../../../types/football-api/football-team.model";

// Get CHAMPIONS LEAGUE Schedule
export interface GetChampionsLeagueScheduleRequest {
  type: typeof C.GET_CHAMPIONS_LEAGUE_SCHEDULE_REQUEST;
}

export interface GetChampionsLeagueScheduleSuccess {
  type: typeof C.GET_CHAMPIONS_LEAGUE_SCHEDULE_SUCCESS;
  payload: FootballSchedule;
  sortedSchedule: FootballSortedSchedule;
}

export interface GetChampionsLeagueScheduleFailure {
  type: typeof C.GET_CHAMPIONS_LEAGUE_SCHEDULE_FAILURE;
  err: any;
}

// Get CHAMPIONS LEAGUE games live
export interface GetChampionsLeagueGamesLiveRequest {
  type: typeof C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_REQUEST;
}

export interface GetChampionsLeagueGamesLiveSuccess {
  type: typeof C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_SUCCESS;
  payload: FootballSchedule;
}

export interface GetChampionsLeagueGamesLiveFailure {
  type: typeof C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_FAILURE;
  err: any;
}

// Get CHAMPIONS LEAGUE Teams
export interface GetChampionsLeagueTeamsRequest {
  type: typeof C.GET_CHAMPIONS_LEAGUE_TEAMS_REQUEST;
}

export interface GetChampionsLeagueTeamsSuccess {
  type: typeof C.GET_CHAMPIONS_LEAGUE_TEAMS_SUCCESS;
  payload: FootballTeam;
}

export interface GetChampionsLeagueTeamsFailure {
  type: typeof C.GET_CHAMPIONS_LEAGUE_TEAMS_FAILURE;
  err: any;
}

export type ChampionsLeagueActionTypes =
  | GetChampionsLeagueScheduleRequest
  | GetChampionsLeagueScheduleSuccess
  | GetChampionsLeagueScheduleFailure
  | GetChampionsLeagueGamesLiveRequest
  | GetChampionsLeagueGamesLiveSuccess
  | GetChampionsLeagueGamesLiveFailure
  | GetChampionsLeagueTeamsRequest
  | GetChampionsLeagueTeamsSuccess
  | GetChampionsLeagueTeamsFailure;
