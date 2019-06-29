import { FootballSchedule } from "./football-schedule.model";

export interface FootballSortedSchedule {
  gamesToday: FootballSchedule[];
  upcoming: FootballSchedule[];
  beforeToday: FootballSchedule[];
}