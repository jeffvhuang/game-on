import { NbaTeamBase } from "./nba-team-base.model";
import { NbaScore } from "./nba-score.model";
import { NbaStatsLeader } from "./nba-stats-leader.model";

export interface NbaCompetingTeamDetails extends NbaTeamBase {
  allStar: string;
  nbaFranchise: string;
  score: NbaScore;
  leaders: NbaStatsLeader[];
}