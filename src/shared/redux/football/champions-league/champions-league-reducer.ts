import * as C from "./champions-league-constants";
import { ChampionsLeagueActionTypes } from "./champions-league-types";
import { FootballState } from "../football-types";

const initialState: FootballState = {
  isFetching: false,
  schedule: [],
  teams: [],
  today: [],
  upcoming: [],
  completed: [],
  videos: [],
  thumbnails: [],
  error: {}
};

function championsLeagueReducer(
  state = initialState,
  action: ChampionsLeagueActionTypes
): FootballState {
  switch (action.type) {
    case C.GET_CHAMPIONS_LEAGUE_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_CHAMPIONS_LEAGUE_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        schedule: action.payload,
        today: action.sortedSchedule.today,
        upcoming: action.sortedSchedule.upcoming,
        completed: action.sortedSchedule.completed
      });
    case C.GET_CHAMPIONS_LEAGUE_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        live: action.payload
      });
    case C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case C.GET_CHAMPIONS_LEAGUE_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_CHAMPIONS_LEAGUE_TEAMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        teams: action.payload
      });
    case C.GET_CHAMPIONS_LEAGUE_TEAMS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default championsLeagueReducer;
