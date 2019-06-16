import { ESportsWinner } from "./esports-winner.model";

export interface ESportsGame {
  winnerType: string;
  winner: ESportsWinner;
  position: number;
  matchId: number;
  length: number;
  id: number;
  forfeit: boolean;
  finished: boolean;
  endAt: string;
  beginAt: string;
}