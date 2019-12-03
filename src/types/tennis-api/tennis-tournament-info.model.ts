import { TennisTournament } from "./tennis-tournament.model";
import { TennisSeason } from "./tennis-season.model";
import { TennisTournamentRound } from "./tennis-tournament-round.model";
import { TennisInfo } from "./tennis-info.model";
import { TennisCoverageInfo } from "./tennis-coverage-info.model";
import { TennisWinner } from "./tennis-winner.model";
import { TennisCompetitor } from "./tennis-competitor.model";
import { TennisStage } from "./tennis-stage.model";

export interface TennisTournamentInfo {
  tournament: TennisTournament;
  season: TennisSeason;
  tournamentRound: TennisTournamentRound | null;
  info: TennisInfo;
  coverageInfo: TennisCoverageInfo;
  winnerLastSeason: TennisWinner;
  competitors: TennisCompetitor[];
  stages: TennisStage[];
  generatedAt: string;
  schema: string;
}
