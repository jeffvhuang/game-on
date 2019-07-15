import * as C from './champions-league-constants';
import { YoutubePlaylistItem } from '../../../../types/youtube/youtube-playlist-item.model';
import { FootballSchedule } from '../../../../types/football-api/football-schedule.model';
import { FootballSortedSchedule } from '../../../../types/football-api/football-sorted-schedule.model';
import { FootballTeam } from '../../../../types/football-api/football-team.model';
import { ThumbnailObject } from '../../../../types/tennis-api/thumbnail-object.model';

export interface ChampionsLeagueState {
  isFetching: boolean,
  teams: FootballTeam[],
  schedule: FootballSchedule[],
  live: FootballSchedule[],
  gamesToday: FootballSchedule[],
  upcoming: FootballSchedule[],
  completed: FootballSchedule[],
  videos: YoutubePlaylistItem[],
  thumbnails: ThumbnailObject[],
  error: any
}

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

// Get Videos
export interface GetChampionsLeagueVideosRequest {
  type: typeof C.GET_CHAMPIONS_LEAGUE_VIDEOS_REQUEST;
}

export interface GetChampionsLeagueVideosSuccess {
  type: typeof C.GET_CHAMPIONS_LEAGUE_VIDEOS_SUCCESS;
  payload: YoutubePlaylistItem[];
}

export interface GetChampionsLeagueVideosFailure {
  type: typeof C.GET_CHAMPIONS_LEAGUE_VIDEOS_FAILURE;
  err: any;
}

export type ChampionsLeagueActionTypes =
  GetChampionsLeagueScheduleRequest |
  GetChampionsLeagueScheduleSuccess |
  GetChampionsLeagueScheduleFailure |
  GetChampionsLeagueGamesLiveRequest |
  GetChampionsLeagueGamesLiveSuccess |
  GetChampionsLeagueGamesLiveFailure |
  GetChampionsLeagueTeamsRequest |
  GetChampionsLeagueTeamsSuccess |
  GetChampionsLeagueTeamsFailure |
  GetChampionsLeagueVideosRequest |
  GetChampionsLeagueVideosSuccess |
  GetChampionsLeagueVideosFailure;