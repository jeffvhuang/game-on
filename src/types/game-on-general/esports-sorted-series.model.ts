import { ESportsSeries } from "../esports-api/esports-series.model";

export interface EsportsSortedSeries {
  ongoing: ESportsSeries[];
  upcoming: ESportsSeries[];
  completed: ESportsSeries[];
}
