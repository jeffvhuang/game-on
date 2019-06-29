import { NbaCompetingTeam } from "./nba-competing-team.model";

export interface NbaSchedule {
  seasonYear: string;
  league: string;
  gameId: string;
  startTimeUTC: string;
  endTimeUTC: string;
  arena: string;
  city: string;
  country: string;
  clock: string;
  gameDuration: string;
  currentPeriod: string;
  halftime: string;
  endOfPeriod: string;
  seasonStage: string;
  statusShortGame: string;
  statusGame: string;
  vTeam: NbaCompetingTeam;
  hTeam: NbaCompetingTeam;
}