import { TennisMatch } from "./tennis-match.model";

export interface RoundMatches {
  round: string;
  matches: TennisMatch[];
}