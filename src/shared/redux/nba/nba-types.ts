import { NbaSchedule } from "../../../types/nba-api/nba-schedule.model";
import { NbaSortedSchedule } from "../../../types/nba-api/nba-sorted-schedule.model";
import * as C from "./nba-constants";
import { NbaTeam } from "../../../types/nba-api/nba-team.model";
import { YoutubePlaylistItem } from "../../../types/youtube/youtube-playlist-item.model";
import { ThumbnailObject } from "../../../types/tennis-api/thumbnail-object.model";
import { NbaGameDetails } from "../../../types/nba-api/nba-game-details.model";

export interface NbaState {
  isFetching: boolean,
  schedule: NbaSchedule[],
  teams: NbaTeam[],
  gamesToday: NbaSchedule[],
  upcoming: NbaSchedule[],
  completed: NbaSchedule[],
  gameDetails: NbaGameDetails,
  videos: YoutubePlaylistItem[],
  thumbnails: ThumbnailObject[],
  error: any
}

// Get NBA Schedule
export interface GetNbaScheduleRequest {
  type: typeof C.GET_NBA_SCHEDULE_REQUEST;
}

export interface GetNbaScheduleSuccess {
  type: typeof C.GET_NBA_SCHEDULE_SUCCESS;
  payload: NbaSchedule[];
  sortedSchedule: NbaSortedSchedule;
}

export interface GetNbaScheduleFailure {
  type: typeof C.GET_NBA_SCHEDULE_FAILURE;
  err: any;
}

// Get NBA Game's details
export interface GetNbaGameDetailsRequest {
  type: typeof C.GET_NBA_GAME_DETAILS_REQUEST;
}

export interface GetNbaGameDetailsSuccess {
  type: typeof C.GET_NBA_GAME_DETAILS_SUCCESS;
  payload: NbaGameDetails;
}

export interface GetNbaGameDetailsFailure {
  type: typeof C.GET_NBA_GAME_DETAILS_FAILURE;
  err: any;
}

// Get NBA Teams
export interface GetNbaTeamsRequest {
  type: typeof C.GET_NBA_TEAMS_REQUEST;
}

export interface GetNbaTeamsSuccess {
  type: typeof C.GET_NBA_TEAMS_SUCCESS;
  payload: NbaTeam[];
}

export interface GetNbaTeamsFailure {
  type: typeof C.GET_NBA_TEAMS_FAILURE,
  err: any 
}

// Get NBA Videos
export interface GetNbaVideosRequest {
  type: typeof C.GET_NBA_VIDEOS_REQUEST;
}

export interface GetNbaVideosSuccess {
  type: typeof C.GET_NBA_VIDEOS_SUCCESS;
  payload: YoutubePlaylistItem[];
}
export interface GetNbaVideosFailure {
  type: typeof C.GET_NBA_VIDEOS_FAILURE;
  err: any;
}

export type NbaActionTypes = 
  GetNbaScheduleRequest | 
  GetNbaScheduleSuccess | 
  GetNbaScheduleFailure |
  GetNbaGameDetailsRequest |
  GetNbaGameDetailsSuccess |
  GetNbaGameDetailsFailure |
  GetNbaTeamsRequest |
  GetNbaTeamsSuccess |
  GetNbaTeamsFailure |
  GetNbaVideosRequest |
  GetNbaVideosSuccess |
  GetNbaVideosFailure;