import { FootballSchedule } from "./football-schedule.model";

export interface FootballSortedSchedule {
  live: FootballSchedule[];
  upcoming: FootballSchedule[];
  completed: FootballSchedule[];
}