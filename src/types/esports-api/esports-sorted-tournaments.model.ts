import { ESportsTournament } from "./esports-tournament.model";
import { ESportsTeamBase } from "./esports-team-base.model";

export interface ESportsSortedTournaments {
  ongoing: ESportsTournament[];
  upcoming: ESportsTournament[];
  completed: ESportsTournament[];
  teams: ESportsTeamBase[];
}