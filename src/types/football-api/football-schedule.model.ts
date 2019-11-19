import { FootballCompetingTeam } from "./footballl-competing-team.model";
import { FootballScore } from "./football-score.model";

export interface FootballSchedule {
  fixtureId: number;
  leagueId: number;
  eventDate: string;
  eventTimestamp: number;
  firstHalfStart: number | null;
  secondHalfStart: number | null;
  round: string;
  status: string;
  statusShort: string;
  elapsed: number;
  venue: string | null;
  referee: string | null;
  homeTeam: FootballCompetingTeam;
  awayTeam: FootballCompetingTeam;
  goalsHomeTeam: number | null;
  goalsAwayTeam: number | null;
  score: FootballScore;
}
