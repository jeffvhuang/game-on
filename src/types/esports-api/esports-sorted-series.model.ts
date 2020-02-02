import { ESportsSeries } from "./esports-series.model";

export interface ESportsSortedSeries {
  ongoingSeries: ESportsSeries[];
  upcomingSeries: ESportsSeries[];
  completedSeries: ESportsSeries[];
}