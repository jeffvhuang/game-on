export interface ESportsSeriesBase {
  year: number;
  winnerType: string | null;
  winnerId: number | null;
  slug: string;
  season: string | null;
  prizepool: string | null;
  name: string;
  leagueId: number;
  id: number;
  fullName: string | null;
  endAt: string | null;
  description: string | null;
  beginAt: string | null;
}