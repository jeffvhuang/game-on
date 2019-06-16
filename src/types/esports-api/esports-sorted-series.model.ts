import { ESportsSeries } from "./espots-series.model";

export interface ESportsSortedSeries {
  ongoingSeries: ESportsSeries[];
  upcomingSeries: ESportsSeries[];
  completedSeries: ESportsSeries[];
}