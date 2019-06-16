import { ESportsTeamBase } from "./esports-team-base.model";

export interface ESportsOpponent {
  type: string;
  opponent: ESportsTeamBase;
}