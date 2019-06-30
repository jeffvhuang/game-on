import { ESportsWinner } from "./esports-winner.model";

export interface ESportsGame {
  winnerType: string | null;
  winner: ESportsWinner;
  position: number;
  matchId: number;
  length: number | null;
  id: number;
  forfeit: boolean;
  finished: boolean;
  endAt: string | null;
  beginAt: string | null;
}