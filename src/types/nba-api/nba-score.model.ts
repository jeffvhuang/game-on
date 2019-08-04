import { NbaScoreBase } from "./nba-score-base.model";

export interface NbaScore extends NbaScoreBase {
  win: string;
  loss: string;
  seriesWin: string;
  seriesLoss: string;
  lineScore: string[];
}