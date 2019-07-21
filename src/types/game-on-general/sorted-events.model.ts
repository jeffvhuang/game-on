import { GameOnEvent } from "./game-on-event.model";

export interface SortedEvents {
  recentlyCompleted: GameOnEvent[];
  live: GameOnEvent[];
  upcoming: GameOnEvent[];
}