import axios from "axios";

import * as T from "./europa-league-types";
import * as C from "./europa-league-constants";
import { sleep, sortFootballSchedule } from "../../../../helpers/utils";

// Mock data
import EUROPA_LEAGUE_TEAMS from "../../../../mockApiData/eplTeams.json";
import EUROPA_LEAGUE_SCHEDULE from "../../../../mockApiData/eplSchedule.json";
import { ThunkAction } from "redux-thunk";
import { ReduxState } from "../../redux-state";
import { FootballSchedule } from "../../../../types/football-api/football-schedule.model";
// import { PLAYLIST } from '../../../mockApiData/europaLeagueYoutube.js';

// Get Schedule
export function getEuropaLeagueScheduleRequest(): T.GetEuropaLeagueScheduleRequest {
  return { type: C.GET_EUROPA_LEAGUE_SCHEDULE_REQUEST };
}
export function getEuropaLeagueScheduleSuccess(
  payload,
  sortedSchedule
): T.GetEuropaLeagueScheduleSuccess {
  return {
    type: C.GET_EUROPA_LEAGUE_SCHEDULE_SUCCESS,
    payload,
    sortedSchedule
  };
}
export function getEuropaLeagueScheduleFailure(
  err
): T.GetEuropaLeagueScheduleFailure {
  return { type: C.GET_EUROPA_LEAGUE_SCHEDULE_FAILURE, err };
}

// export const getEuropaLeagueSchedule = (): ThunkAction<
//   Promise<void>, ReduxState, null, T.EuropaLeagueActionTypes
// > => async (dispatch) => {
//   dispatch(getEuropaLeagueScheduleRequest());
//   return axios({
//     method: 'get',
//     url: gameonAPI.HOST + gameonAPI.EUROPA_LEAGUE + gameonAPI.SCHEDULE,
//   }).then(response => {
//     const sortedSchedule = sortFootballSchedule(response.data);
//     dispatch(getEuropaLeagueScheduleSuccess(response.data, sortedSchedule));
//   }).catch(err => {
//     dispatch(getEuropaLeagueScheduleFailure(err));
//   });
// };

// return mock data
export const getEuropaLeagueSchedule = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.EuropaLeagueActionTypes
> => async dispatch => {
  dispatch(getEuropaLeagueScheduleRequest());
  await sleep(1000);
  const sortedSchedule = sortFootballSchedule(
    EUROPA_LEAGUE_SCHEDULE as FootballSchedule[]
  );
  dispatch(
    getEuropaLeagueScheduleSuccess(EUROPA_LEAGUE_SCHEDULE, sortedSchedule)
  );
};

// Get Teams
export function getEuropaLeagueTeamsRequest(): T.GetEuropaLeagueTeamsRequest {
  return { type: C.GET_EUROPA_LEAGUE_TEAMS_REQUEST };
}
export function getEuropaLeagueTeamsSuccess(
  payload
): T.GetEuropaLeagueTeamsSuccess {
  return { type: C.GET_EUROPA_LEAGUE_TEAMS_SUCCESS, payload };
}
export function getEuropaLeagueTeamsFailure(
  err
): T.GetEuropaLeagueTeamsFailure {
  return { type: C.GET_EUROPA_LEAGUE_TEAMS_FAILURE, err };
}

// export const getEuropaLeagueTeams = (): ThunkAction<
//   Promise<void>, ReduxState, null, T.EuropaLeagueActionTypes
// > => async (dispatch) => {
//   dispatch(getEuropaLeagueTeamsRequest());
//   return axios({
//     method: 'get',
//     url: gameonAPI.HOST + gameonAPI.EUROPA_LEAGUE + gameonAPI.TEAMS
//   }).then(response => {
//     dispatch(getEuropaLeagueTeamsSuccess(response.data));
//   }).catch(err => {
//     dispatch(getEuropaLeagueTeamsFailure(err));
//   });
// };

// return mock data
export const getEuropaLeagueTeams = (): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  T.EuropaLeagueActionTypes
> => async dispatch => {
  dispatch(getEuropaLeagueTeamsRequest());
  await sleep(1000);
  dispatch(getEuropaLeagueTeamsSuccess(EUROPA_LEAGUE_TEAMS));
};
