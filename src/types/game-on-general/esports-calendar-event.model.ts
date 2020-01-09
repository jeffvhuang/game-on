export interface EsportsCalendarEvent {
  id: number;
  title: string;
  start: string | null;
  end: string | null;
  year: number;
  leagueId?: number;
}
