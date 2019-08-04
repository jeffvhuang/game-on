import { NbaTeamBase } from "./nba-team-base.model";
import { NbaScoreBase } from "./nba-score-base.model";

export interface NbaCompetingTeam extends NbaTeamBase {
  score: NbaScoreBase;
}