import * as C from "./europa-league-constants";
import { FootballSchedule } from "../../../../types/football-api/football-schedule.model";
import { FootballTeam } from "../../../../types/football-api/football-team.model";
import { FootballSortedSchedule } from "../../../../types/football-api/football-sorted-schedule.model";

// Get EUROPA_LEAGUE Schedule
export interface GetEuropaLeagueScheduleRequest {
  type: typeof C.GET_EUROPA_LEAGUE_SCHEDULE_REQUEST;
}

export interface GetEuropaLeagueScheduleSuccess {
  type: typeof C.GET_EUROPA_LEAGUE_SCHEDULE_SUCCESS;
  payload: FootballSchedule;
  sortedSchedule: FootballSortedSchedule;
}

export interface GetEuropaLeagueScheduleFailure {
  type: typeof C.GET_EUROPA_LEAGUE_SCHEDULE_FAILURE;
  err: any;
}

// Get EUROPA_LEAGUE Teams
export interface GetEuropaLeagueTeamsRequest {
  type: typeof C.GET_EUROPA_LEAGUE_TEAMS_REQUEST;
}

export interface GetEuropaLeagueTeamsSuccess {
  type: typeof C.GET_EUROPA_LEAGUE_TEAMS_SUCCESS;
  payload: FootballTeam;
}

export interface GetEuropaLeagueTeamsFailure {
  type: typeof C.GET_EUROPA_LEAGUE_TEAMS_FAILURE;
  err: any;
}

export type EuropaLeagueActionTypes =
  | GetEuropaLeagueScheduleRequest
  | GetEuropaLeagueScheduleSuccess
  | GetEuropaLeagueScheduleFailure
  | GetEuropaLeagueTeamsRequest
  | GetEuropaLeagueTeamsSuccess
  | GetEuropaLeagueTeamsFailure;
