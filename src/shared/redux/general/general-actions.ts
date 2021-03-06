import axios from "axios";
import { ThunkAction } from "redux-thunk";

import { ReduxState } from "../redux-state";
import * as T from "./general-types";
import * as C from "./general-constants";
import { gameonAPI, env } from "../../../helpers/constants";

// Mock data
import SORTED_EVENTS from "../../../mockApiData/events.json";
import SORTED_WEEK_EVENTS from "../../../mockApiData/eventsForWeek2.json";
// import SORTED_WEEK_EVENTS2 from "../../../mockApiData/eventsForWeek2.json";

//#region Get events sorted into live, upcoming and recently completed
export function getEventsRequest(): T.GetEventsRequest {
  return { type: C.GET_EVENTS_REQUEST };
}
export function getEventsSuccess(payload): T.GetEventsSuccess {
  return { type: C.GET_EVENTS_SUCCESS, payload };
}
export function getEventsFailure(err): T.GetEventsFailure {
  return { type: C.GET_EVENTS_FAILURE, err };
}

export const getEvents = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.GeneralActionTypes
> => async dispatch => {
  dispatch(getEventsRequest());
  if (env === "dev") {
    dispatch(getEventsSuccess(SORTED_EVENTS));
    return;
  }

  return axios
    .get(gameonAPI.HOST + gameonAPI.GENERAL + gameonAPI.EVENTS)
    .then(response => {
      dispatch(getEventsSuccess(response.data));
    })
    .catch(err => {
      dispatch(getEventsFailure(err));
    });
};
//#endregion

//#region Get events sorted into live, upcoming and recently completed
export function getEventsForWeekRequest(): T.GetEventsForWeekRequest {
  return { type: C.GET_EVENTS_FOR_WEEK_REQUEST };
}
export function getEventsForWeekSuccess(payload): T.GetEventsForWeekSuccess {
  return { type: C.GET_EVENTS_FOR_WEEK_SUCCESS, payload };
}
export function getEventsForWeekFailure(err): T.GetEventsForWeekFailure {
  return { type: C.GET_EVENTS_FOR_WEEK_FAILURE, err };
}

export const getEventsForWeek = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.GeneralActionTypes
> => async dispatch => {
  dispatch(getEventsForWeekRequest());
  if (env === "dev") {
    dispatch(getEventsForWeekSuccess(SORTED_WEEK_EVENTS));
    return;
  }

  return axios
    .get(gameonAPI.HOST + gameonAPI.GENERAL + gameonAPI.EVENTS + "/week")
    .then(response => {
      dispatch(getEventsForWeekSuccess(response.data));
    })
    .catch(err => {
      dispatch(getEventsForWeekFailure(err));
    });
};
//#endregion
