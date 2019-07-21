import * as C from "./general-constants";
import { GameOnEvent } from "../../../types/game-on-general/game-on-event.model";
import { SortedEvents } from "../../../types/game-on-general/sorted-events.model";

export interface GeneralState {
  isFetching: boolean,
  recentlyCompletedEvents: GameOnEvent[],
  liveEvents: GameOnEvent[],
  upcomingEvents: GameOnEvent[],
  error: any
}

// Get NBA Schedule
export interface GetEventsRequest {
  type: typeof C.GET_EVENTS_REQUEST;
}

export interface GetEventsSuccess {
  type: typeof C.GET_EVENTS_SUCCESS;
  payload: SortedEvents;
}

export interface GetEventsFailure {
  type: typeof C.GET_EVENTS_FAILURE;
  err: any;
}

export type GeneralActionTypes = 
  GetEventsRequest | 
  GetEventsSuccess | 
  GetEventsFailure