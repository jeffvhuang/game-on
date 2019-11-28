import { FootballSchedule } from "./football-schedule.model";

export interface FootballSortedSchedule {
  today: FootballSchedule[];
  upcoming: FootballSchedule[];
  completed: FootballSchedule[];
}
