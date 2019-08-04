import { NbaGameBase } from "./nba-game-base.model";
import { NbaOfficial } from "./nba-official.model";
import { NbaCompetingTeamDetails } from "./nba-competing-team-details.model";

export interface NbaGameDetails extends NbaGameBase {
  vTeam: NbaCompetingTeamDetails;
  hTeam: NbaCompetingTeamDetails;
  officials: NbaOfficial[];
}