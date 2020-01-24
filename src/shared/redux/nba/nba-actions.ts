import axios from "axios";
import { ThunkAction } from "redux-thunk";

import { ReduxState } from "../redux-state";
import * as T from "./nba-types";
import * as C from "./nba-constants";
import { gameonAPI, env } from "../../../helpers/constants";
import { sleep, sortNBASchedule } from "../../../helpers/utils";
import { NbaSchedule } from "../../../types/nba-api/nba-schedule.model";

// Mock data
import TEAMS from "../../../mockApiData/nbaTeams.json";
import SCHEDULE from "../../../mockApiData/nbaSchedule.json";
import GAME_DETAILS from "../../../mockApiData/nbaGameDetails.json";
import GAME_DETAILS_PLAYOFF from "../../../mockApiData/nbaGameDetailsPlayoff.json";

//#region Get Schedule
export function getNbaScheduleRequest(): T.GetNbaScheduleRequest {
  return { type: C.GET_NBA_SCHEDULE_REQUEST };
}
export function getNbaScheduleSuccess(
  payload,
  sortedSchedule
): T.GetNbaScheduleSuccess {
  return { type: C.GET_NBA_SCHEDULE_SUCCESS, payload, sortedSchedule };
}
export function getNbaScheduleFailure(err): T.GetNbaScheduleFailure {
  return { type: C.GET_NBA_SCHEDULE_FAILURE, err };
}

export const getNbaSchedule = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.NbaActionTypes
> => async dispatch => {
  dispatch(getNbaScheduleRequest());
  if (env === "dev") {
    const sortedSchedule = sortNBASchedule(SCHEDULE as NbaSchedule[]);
    dispatch(getNbaScheduleSuccess(SCHEDULE, sortedSchedule));
    return;
  }

  return axios({
    method: "get",
    url: gameonAPI.HOST + gameonAPI.NBA + gameonAPI.SCHEDULE
  })
    .then(response => {
      const sortedSchedule = sortNBASchedule(response.data);
      dispatch(getNbaScheduleSuccess(response.data, sortedSchedule));
    })
    .catch(err => {
      dispatch(getNbaScheduleFailure(err));
      throw err;
    });
};
//#endregion

//#region Get a specific game's details
export function getNbaGameDetailsRequest(): T.GetNbaGameDetailsRequest {
  return { type: C.GET_NBA_GAME_DETAILS_REQUEST };
}
export function getNbaGameDetailsSuccess(payload): T.GetNbaGameDetailsSuccess {
  return { type: C.GET_NBA_GAME_DETAILS_SUCCESS, payload };
}
export function getNbaGameDetailsFailure(err): T.GetNbaGameDetailsFailure {
  return { type: C.GET_NBA_GAME_DETAILS_FAILURE, err };
}

export const getNbaGameDetails = (
  gameId: string
): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.NbaActionTypes
> => async dispatch => {
  dispatch(getNbaGameDetailsRequest());
  if (env === "dev") {
    dispatch(getNbaGameDetailsSuccess(GAME_DETAILS));
    // dispatch(getNbaGameDetailsSuccess(GAME_DETAILS_PLAYOFF));
    return;
  }

  return axios({
    method: "get",
    url: `${gameonAPI.HOST}${gameonAPI.NBA}${gameonAPI.GAMES}/${gameId}`
  })
    .then(response => {
      dispatch(getNbaGameDetailsSuccess(response.data));
    })
    .catch(err => {
      dispatch(getNbaGameDetailsFailure(err));
    });
};
//#endregion

//#region Get Teams
export function getNbaTeamsRequest(): T.GetNbaTeamsRequest {
  return { type: C.GET_NBA_TEAMS_REQUEST };
}
export function getNbaTeamsSuccess(payload): T.GetNbaTeamsSuccess {
  return { type: C.GET_NBA_TEAMS_SUCCESS, payload };
}
export function getNbaTeamsFailure(err): T.GetNbaTeamsFailure {
  return { type: C.GET_NBA_TEAMS_FAILURE, err };
}

export const getNbaTeams = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.NbaActionTypes
> => async dispatch => {
  dispatch(getNbaTeamsRequest());
  if (env === "dev") {
    const nbaTeams = TEAMS.filter(team => team.nbaFranchise == "1");
    dispatch(getNbaTeamsSuccess(nbaTeams));
    return;
  }

  return axios({
    method: "get",
    url: gameonAPI.HOST + gameonAPI.NBA + gameonAPI.TEAMS
  })
    .then(response => {
      const nbaTeams = response.data.filter(team => team.nbaFranchise == "1");
      dispatch(getNbaTeamsSuccess(nbaTeams));
    })
    .catch(err => {
      dispatch(getNbaTeamsFailure(err));
      // throw(err);
    });
};
//#endregion
