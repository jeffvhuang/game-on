import { GameOnEvent } from "./game-on-event.model";

export interface SortedWeekEvents {
  today: GameOnEvent[];
  tomorrow: GameOnEvent[];
  day3: GameOnEvent[];
  day4: GameOnEvent[];
  day5: GameOnEvent[];
  day6: GameOnEvent[];
  day7: GameOnEvent[];
}