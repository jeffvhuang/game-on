import { FootballSchedule } from "../football-schedule.model";
import { FootballTeam } from "../football-team.model";

export interface EplStoreState {
  isFetching: boolean;
  schedule: FootballSchedule[];
  teams: FootballTeam[];
  gamesToday: FootballSchedule[];
  upcoming: FootballSchedule[];
  completed: FootballSchedule[];
  videos: any[];
  thumbnails: any[];
}