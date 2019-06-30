import { Sport } from "./sport.model";
import { TennisCategory } from "./tennis-category.model";
import { TennisSeason } from "./tennis-season.model";

export interface TennisTournament {
  id: string;
  name: string;
  parentId: string | null;
  gender: string;
  type: string;
  countryFormat: boolean;
  sport: Sport;
  category: TennisCategory;
  currentSeason: TennisSeason | null;
}