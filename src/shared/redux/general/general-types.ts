import * as C from "./general-constants";
import { GameOnEvent } from "../../../types/game-on-general/game-on-event.model";
import { SortedEvents } from "../../../types/game-on-general/sorted-events.model";
import { SortedWeekEvents } from "../../../types/game-on-general/sorted-week-events.model";

export interface GeneralState {
  isFetching: boolean,
  eventsForWeek: SortedWeekEvents,
  recentlyCompletedEvents: GameOnEvent[],
  liveEvents: GameOnEvent[],
  upcomingEvents: GameOnEvent[],
  error: any
}

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

export interface GetEventsForWeekRequest {
  type: typeof C.GET_EVENTS_FOR_WEEK_REQUEST;
}

export interface GetEventsForWeekSuccess {
  type: typeof C.GET_EVENTS_FOR_WEEK_SUCCESS;
  payload: SortedWeekEvents;
}

export interface GetEventsForWeekFailure {
  type: typeof C.GET_EVENTS_FOR_WEEK_FAILURE;
  err: any;
}

export type GeneralActionTypes = 
  GetEventsRequest | 
  GetEventsSuccess | 
  GetEventsFailure |
  GetEventsForWeekRequest |
  GetEventsForWeekSuccess |
  GetEventsForWeekFailure