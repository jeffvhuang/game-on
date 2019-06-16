import { ESportsTeam } from "./esports-team.model";

export interface ESportsOpponent {
  type: string;
  opponent: ESportsTeam;
}