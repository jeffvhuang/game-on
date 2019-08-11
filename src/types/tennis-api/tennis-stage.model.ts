import { TennisCompetitor } from "./tennis-competitor.model";

export interface TennisStage {
  type: string;
  competitors: TennisCompetitor[];
  numberOfScheduledMatches: number;
}