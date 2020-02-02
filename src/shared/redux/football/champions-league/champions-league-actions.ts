import axios from "axios";

import * as C from "./champions-league-constants";
import * as T from "./champions-league-types";
import { gameonAPI, env } from "../../../../helpers/constants";
import { sleep, sortFootballSchedule } from "../../../../helpers/utils";

import CL_TEAMS from "../../../../mockApiData/championsLeagueTeams.json";
import CL_SCHEDULE from "../../../../mockApiData/championsLeagueSchedule.json";
import { ThunkAction } from "redux-thunk";
import { ReduxState } from "../../redux-state";
import { FootballSchedule } from "../../../../types/football-api/football-schedule.model";

//#region Get Schedule
export function getChampionsLeagueScheduleRequest(): T.GetChampionsLeagueScheduleRequest {
  return { type: C.GET_CHAMPIONS_LEAGUE_SCHEDULE_REQUEST };
}
export function getChampionsLeagueScheduleSuccess(
  payload,
  sortedSchedule
): T.GetChampionsLeagueScheduleSuccess {
  return {
    type: C.GET_CHAMPIONS_LEAGUE_SCHEDULE_SUCCESS,
    payload,
    sortedSchedule
  };
}
export function getChampionsLeagueScheduleFailure(
  err
): T.GetChampionsLeagueScheduleFailure {
  return { type: C.GET_CHAMPIONS_LEAGUE_SCHEDULE_FAILURE, err };
}

export const getChampionsLeagueSchedule = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.ChampionsLeagueActionTypes
> => async dispatch => {
  dispatch(getChampionsLeagueScheduleRequest());
  if (env === "dev") {
    const sortedSchedule = sortFootballSchedule(
      CL_SCHEDULE as FootballSchedule[]
    );
    dispatch(getChampionsLeagueScheduleSuccess(CL_SCHEDULE, sortedSchedule));
    return;
  }

  return axios({
    method: "get",
    url: gameonAPI.HOST + gameonAPI.CHAMPIONS_LEAGUE + gameonAPI.SCHEDULE
  })
    .then(response => {
      const sortedSchedule = sortFootballSchedule(response.data);
      dispatch(
        getChampionsLeagueScheduleSuccess(response.data, sortedSchedule)
      );
    })
    .catch(err => {
      dispatch(getChampionsLeagueScheduleFailure(err));
    });
};
//#endregion

//#region Get Live Games
export function getChampionsLeagueGamesLiveRequest(): T.GetChampionsLeagueGamesLiveRequest {
  return { type: C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_REQUEST };
}
export function getChampionsLeagueGamesLiveSuccess(
  payload
): T.GetChampionsLeagueGamesLiveSuccess {
  return { type: C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_SUCCESS, payload };
}
export function getChampionsLeagueGamesLiveFailure(
  err
): T.GetChampionsLeagueGamesLiveFailure {
  return { type: C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_FAILURE, err };
}

export const getChampionsLeagueGamesLive = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.ChampionsLeagueActionTypes
> => async dispatch => {
  dispatch(getChampionsLeagueGamesLiveRequest());
  if (env === "dev") {
    const sortedSchedule = sortFootballSchedule(CL_SCHEDULE);
    dispatch(getChampionsLeagueScheduleSuccess(CL_SCHEDULE, sortedSchedule));
    return;
  }

  return axios({
    method: "get",
    url:
      gameonAPI.HOST +
      gameonAPI.CHAMPIONS_LEAGUE +
      gameonAPI.GAMES +
      gameonAPI.LIVE
  })
    .then(response => {
      const sortedSchedule = sortFootballSchedule(response.data);
      dispatch(
        getChampionsLeagueScheduleSuccess(response.data, sortedSchedule)
      );
    })
    .catch(err => {
      dispatch(getChampionsLeagueScheduleFailure(err));
    });
};
//#endregion

//#region Get Teams
export function getChampionsLeagueTeamsRequest(): T.GetChampionsLeagueTeamsRequest {
  return { type: C.GET_CHAMPIONS_LEAGUE_TEAMS_REQUEST };
}
export function getChampionsLeagueTeamsSuccess(
  payload
): T.GetChampionsLeagueTeamsSuccess {
  return { type: C.GET_CHAMPIONS_LEAGUE_TEAMS_SUCCESS, payload };
}
export function getChampionsLeagueTeamsFailure(
  err
): T.GetChampionsLeagueTeamsFailure {
  return { type: C.GET_CHAMPIONS_LEAGUE_TEAMS_FAILURE, err };
}

export const getChampionsLeagueTeams = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.ChampionsLeagueActionTypes
> => async dispatch => {
  dispatch(getChampionsLeagueTeamsRequest());
  if (env === "dev") {
    dispatch(getChampionsLeagueTeamsSuccess(CL_TEAMS));
    return;
  }

  return axios({
    method: "get",
    url: gameonAPI.HOST + gameonAPI.CHAMPIONS_LEAGUE + gameonAPI.TEAMS
  })
    .then(response => {
      dispatch(getChampionsLeagueTeamsSuccess(response.data));
    })
    .catch(err => {
      dispatch(getChampionsLeagueTeamsFailure(err));
    });
};
//#endregion
