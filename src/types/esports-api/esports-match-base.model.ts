import { ESportsLive } from "./esports-live.model";

export interface ESportsMatchBase {
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
  beginAt: string;
}