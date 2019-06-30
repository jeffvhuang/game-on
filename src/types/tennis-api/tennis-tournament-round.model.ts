export interface TennisTournamentRound {
  type: string;
  number: number;
  name: string | null;
  cupRoundMatchNumber: number | null;
  cupRoundMatches: number | null;
}