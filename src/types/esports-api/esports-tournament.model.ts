import { ESportsTeamBase } from "./esports-team-base.model";
import { ESportsSeriesBase } from "./esports-series-base.model";
import { ESportsMatchBase } from "./esports-match-base.model";
import { ESportsLeagueBase } from "./esports-league-base.model";
import { ESportsTournamentBase } from "./esports-tournament-base.model";

export interface ESportsTournament extends ESportsTournamentBase {
  teams: ESportsTeamBase[];
  series: ESportsSeriesBase;
  matches: ESportsMatchBase[];
  league: ESportsLeagueBase;
}