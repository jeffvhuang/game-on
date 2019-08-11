import { GameOnCompetitor } from "./game-on-competitor.model";

export interface GameOnEvent {
  id: string;
  startTime: string | null;
  endTime: string | null;
  // "Completed", "Live" ("Ongoing" if isTournament), "Upcoming", "Postponed", "Canceled", ""
  status: string;
  name: string;
  sport: string;
  leagueOrTournament: string;
  selector: string;
  isTournament: boolean;
  competitors: GameOnCompetitor[];
}