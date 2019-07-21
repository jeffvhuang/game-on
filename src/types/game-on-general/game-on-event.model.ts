import { GameOnCompetitor } from "./game-on-competitor.model";

export interface GameOnEvent {
  id: string;
  startTime: string | null;
  endTime: string | null;
  name: string;
  sport: string;
  leagueOrTournament: string;
  competitors: GameOnCompetitor[];
}