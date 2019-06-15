import { TennisTournamentRound } from "./tennis-tournament-round.model";
import { TennisSeason } from "./tennis-season.model";
import { TennisTournament } from "./tennis-tournament.model";
import { TennisCompetitor } from "./tennis-competitor.model";
import { TennisVenue } from "./tennis-venue.model";

export interface TennisTournamentSchedule {
  id: string;
  scheduled: string;
  startTimeTbd: boolean;
  status: string;
  tournamentRound: TennisTournamentRound;
  season: TennisSeason;
  tournament: TennisTournament;
  competitors: TennisCompetitor[];
  venue: TennisVenue;
  estimated: boolean;
}