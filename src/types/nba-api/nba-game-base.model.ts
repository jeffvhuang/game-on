export interface NbaGameBase {
  seasonYear: string;
  league: string;
  gameId: string;
  startTimeUTC: string;
  endTimeUTC: string | null;
  arena: string;
  city: string;
  country: string;
  clock: string;
  gameDuration: string;
  currentPeriod: string;
  halftime: string;
  endOfPeriod: string;
  seasonStage: string;
  statusShortGame: string;
  statusGame: string;
}