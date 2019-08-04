import { NbaCompetingTeam } from "./nba-competing-team.model";
import { NbaGameBase } from "./nba-game-base.model";

export interface NbaSchedule extends NbaGameBase {
  vTeam: NbaCompetingTeam;
  hTeam: NbaCompetingTeam;
}