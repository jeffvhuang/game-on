import axios from "axios";

import * as T from "./epl-types";
import * as C from "./epl-constants";
import { gameonAPI, env } from "../../../../helpers/constants";
import { sleep, sortFootballSchedule } from "../../../../helpers/utils";

// Mock data
import EPL_TEAMS from "../../../../mockApiData/eplTeams.json";
import EPL_SCHEDULE from "../../../../mockApiData/eplSchedule.json";
import { ThunkAction } from "redux-thunk";
import { ReduxState } from "../../redux-state";

//#region Get Schedule
export function getEplScheduleRequest(): T.GetEplScheduleRequest {
  return { type: C.GET_EPL_SCHEDULE_REQUEST };
}
export function getEplScheduleSuccess(
  payload,
  sortedSchedule
): T.GetEplScheduleSuccess {
  return { type: C.GET_EPL_SCHEDULE_SUCCESS, payload, sortedSchedule };
}
export function getEplScheduleFailure(err): T.GetEplScheduleFailure {
  return { type: C.GET_EPL_SCHEDULE_FAILURE, err };
}

export const getEplSchedule = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.EplActionTypes
> => async dispatch => {
  dispatch(getEplScheduleRequest());
  if (env === "dev") {
    await sleep(1000);
    const sortedSchedule = sortFootballSchedule(EPL_SCHEDULE);
    dispatch(getEplScheduleSuccess(EPL_SCHEDULE, sortedSchedule));
    return;
  }

  return axios({
    method: "get",
    url: gameonAPI.HOST + gameonAPI.EPL + gameonAPI.SCHEDULE
  })
    .then(response => {
      const sortedSchedule = sortFootballSchedule(response.data);
      dispatch(getEplScheduleSuccess(response.data, sortedSchedule));
    })
    .catch(err => {
      dispatch(getEplScheduleFailure(err));
    });
};
//#endregion

//#region Get Teams
export function getEplTeamsRequest(): T.GetEplTeamsRequest {
  return { type: C.GET_EPL_TEAMS_REQUEST };
}
export function getEplTeamsSuccess(payload): T.GetEplTeamsSuccess {
  return { type: C.GET_EPL_TEAMS_SUCCESS, payload };
}
export function getEplTeamsFailure(err): T.GetEplTeamsFailure {
  return { type: C.GET_EPL_TEAMS_FAILURE, err };
}

export const getEplTeams = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.EplActionTypes
> => async dispatch => {
  dispatch(getEplTeamsRequest());
  if (env === "dev") {
    await sleep(1000);
    dispatch(getEplTeamsSuccess(EPL_TEAMS));
    return;
  }

  return axios({
    method: "get",
    url: gameonAPI.HOST + gameonAPI.EPL + gameonAPI.TEAMS
  })
    .then(response => {
      dispatch(getEplTeamsSuccess(response.data));
    })
    .catch(err => {
      dispatch(getEplTeamsFailure(err));
    });
};
//#endregion
