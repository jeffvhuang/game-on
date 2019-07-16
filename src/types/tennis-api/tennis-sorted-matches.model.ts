import { TennisMatch } from "./tennis-match.model";

export interface TennisSortedMatches {
  live: TennisMatch[];
  upcoming: TennisMatch[];
  completed: TennisMatch[];
}