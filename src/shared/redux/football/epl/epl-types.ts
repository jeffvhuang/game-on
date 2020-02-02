import * as C from "./epl-constants";
import { FootballSchedule } from "../../../../types/football-api/football-schedule.model";
import { FootballTeam } from "../../../../types/football-api/football-team.model";
import { FootballSortedSchedule } from "../../../../types/football-api/football-sorted-schedule.model";

// Get EPL Schedule
export interface GetEplScheduleRequest {
  type: typeof C.GET_EPL_SCHEDULE_REQUEST;
}

export interface GetEplScheduleSuccess {
  type: typeof C.GET_EPL_SCHEDULE_SUCCESS;
  payload: FootballSchedule;
  sortedSchedule: FootballSortedSchedule;
}

export interface GetEplScheduleFailure {
  type: typeof C.GET_EPL_SCHEDULE_FAILURE;
  err: any;
}

// Get EPL Teams
export interface GetEplTeamsRequest {
  type: typeof C.GET_EPL_TEAMS_REQUEST;
}

export interface GetEplTeamsSuccess {
  type: typeof C.GET_EPL_TEAMS_SUCCESS;
  payload: FootballTeam;
}

export interface GetEplTeamsFailure {
  type: typeof C.GET_EPL_TEAMS_FAILURE;
  err: any;
}

export type EplActionTypes =
  | GetEplScheduleRequest
  | GetEplScheduleSuccess
  | GetEplScheduleFailure
  | GetEplTeamsRequest
  | GetEplTeamsSuccess
  | GetEplTeamsFailure;
