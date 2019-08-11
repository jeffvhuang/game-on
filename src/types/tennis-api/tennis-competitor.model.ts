export interface TennisCompetitor {
  nationality: string;
  countryCode: string;
  seed: number | null;
  bracketNumber: number | null;
  qualifier: string | null;
  qualificationPath: any;
  abbreviation: string;
  id: string;
  name: string;
}