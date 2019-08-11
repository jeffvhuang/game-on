import { TennisTournament } from "./tennis-tournament.model";

export interface TennisSortedTournaments {
  ongoing: TennisTournament[];
  upcoming: TennisTournament[];
  completed: TennisTournament[];
}