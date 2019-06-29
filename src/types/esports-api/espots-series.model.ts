import { ESportsSeriesBase } from "./esports-series-base.model";
import { ESportsLeagueBase } from "./esports-league-base.model";
import { ESportsTournamentBase } from "./esports-tournament-base.model";

export interface ESportsSeries extends ESportsSeriesBase {
  league: ESportsLeagueBase;
  tournaments: ESportsTournamentBase[];
}