import { FootballSchedule } from "../../../types/football-api/football-schedule.model";
import { FootballTeam } from "../../../types/football-api/football-team.model";

export interface FootballState {
  isFetching: boolean;
  schedule: FootballSchedule[];
  teams: FootballTeam[];
  today: FootballSchedule[];
  upcoming: FootballSchedule[];
  completed: FootballSchedule[];
  thumbnails: any[];
  error: any;
}
