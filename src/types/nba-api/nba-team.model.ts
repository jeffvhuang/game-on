import { NbaTeamBase } from "./nba-team-base.model";
import { NbaLeagues } from "./nba-leagues.model";

export interface NbaTeam extends NbaTeamBase {
  city: string;
  nbaFranchise: string;
  allStar: string;
  leagues: NbaLeagues;
}