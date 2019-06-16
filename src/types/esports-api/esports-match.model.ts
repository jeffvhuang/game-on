import { ESportsTournamentBase } from "./esports-tournament-base.model";
import { ESportsTeamBase } from "./esports-team-base.model";
import { ESportsSeriesBase } from "./esports-series-base.model";
import { ESportsLeagueBase } from "./esports-league-base.model";
import { ESportsLive } from "./esports-live.model";
import { ESportsGame } from "./esports-game.model";
import { ESportsOpponent } from "./esports-opponent.model";
import { ESportsResult } from "./esports-result.model";

export interface ESportsMatch {
  tournament: ESportsTournamentBase;
  winner: ESportsTeamBase;
  seriesId: number;
  series: ESportsSeriesBase;
  results: ESportsResult[];
  opponents: ESportsOpponent[];
  leagueId: number;
  league: ESportsLeagueBase;
  games: ESportsGame[];
  winnerId: number;
  tournamentId: number;
  status: string;
  slug: string;
  numberOfGames: number;
  name: string;
  matchType: string;
  live: ESportsLive;
  id: number;
  forfeit: boolean;
  endAt: string;
  draw: boolean;
  beingAt: string;
}