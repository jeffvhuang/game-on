import {
  getChampionsLeagueTeams,
  getChampionsLeagueSchedule
} from "./champions-league/champions-league-actions";
import { getEplSchedule, getEplTeams } from "./epl/epl-actions";
import {
  getEuropaLeagueSchedule,
  getEuropaLeagueTeams
} from "./europa-league/europa-league-actions";
import { ThunkAction } from "redux-thunk";
import { ReduxState } from "../redux-state";
import { AnyAction } from "redux";

export const getFootballLeaguesTeams = (
  league: string
): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  AnyAction
> => async dispatch => {
  switch (league.toLowerCase()) {
    case "epl":
      dispatch(getEplTeams());
      break;
    case "europaleague":
      dispatch(getEuropaLeagueTeams());
      break;
    case "championsleague":
      dispatch(getChampionsLeagueTeams());
      break;
  }
};

export const getFootballLeaguesSchedule = (
  league: string
): ThunkAction<
  Promise<void>,
  ReduxState,
  null,
  AnyAction
> => async dispatch => {
  switch (league.toLowerCase()) {
    case "epl":
      dispatch(getEplSchedule());
      break;
    case "europaleague":
      dispatch(getEuropaLeagueSchedule());
      break;
    case "championsleague":
      dispatch(getChampionsLeagueSchedule());
      break;
  }
};
