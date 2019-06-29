import { NbaTeamBase } from "./nba-team-base.model";
import { NbaScore } from "./nba-score.model";

export interface NbaCompetingTeam extends NbaTeamBase {
  score: NbaScore;
}