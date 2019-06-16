import { NbaSchedule } from "../../../types/nba-api/nba-schedule.model";
import { NbaSortedSchedule } from "../../../types/nba-api/nba-sorted-schedule.model";
import * as C from "./nba-constants";
import { NbaTeam } from "../../../types/nba-api/nba-team.model";
import { YoutubePlaylistItem } from "../../../types/youtube/youtube-playlist-item.model";

export interface GetNbaScheduleRequest { type: typeof C.GET_NBA_SCHEDULE_REQUEST }
export interface GetNbaScheduleSuccess {
  type: typeof C.GET_NBA_SCHEDULE_SUCCESS
  payload: NbaSchedule
  sortedSchedule: NbaSortedSchedule
}
export interface GetNbaScheduleFailure { type: typeof C.GET_NBA_SCHEDULE_FAILURE, err: any }

export interface GetNbaTeamsRequest { type: typeof C.GET_NBA_TEAMS_REQUEST }
export interface GetNbaTeamsSuccess {
  type: typeof C.GET_NBA_TEAMS_SUCCESS
  payload: NbaTeam
}
export interface GetNbaTeamsFailure { type: typeof C.GET_NBA_TEAMS_FAILURE, err: any }

export interface GetNbaVideosRequest { type: typeof C.GET_NBA_VIDEOS_REQUEST }
export interface GetNbaVideosSuccess {
  type: typeof C.GET_NBA_VIDEOS_SUCCESS
  payload: YoutubePlaylistItem[]
}
export interface GetNbaVideosFailure { type: typeof C.GET_NBA_VIDEOS_FAILURE, err: any }

export type NbaActionTypes = 
  GetNbaScheduleRequest | 
  GetNbaScheduleSuccess | 
  GetNbaScheduleFailure |
  GetNbaTeamsRequest |
  GetNbaTeamsSuccess |
  GetNbaTeamsFailure |
  GetNbaVideosRequest |
  GetNbaVideosSuccess |
  GetNbaVideosFailure;