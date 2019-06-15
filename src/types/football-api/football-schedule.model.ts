import { FootballCompetingTeam } from "./footballl-competing-team.model";
import { FootballScore } from "./football-score.model";

export interface FootballSchedule {
  fixtureId: number;
  leagueId: number;
  eventDate: string;
  eventTimestamp: number;
  firstHalfStart: number;
  secondHalfStart: number;
  round: string;
  status: string;
  statusShort: string;
  elapsed: number,
  venue: string;
  referee: any;
  homeTeam: FootballCompetingTeam;
  awayTeam: FootballCompetingTeam;
  goalsHomeTeam: number;
  goalsAwayTeam: number;
  score: FootballScore;
}