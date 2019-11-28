import * as C from "./europa-league-constants";
import { EuropaLeagueActionTypes } from "./europa-league-types";
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

function eplReducer(
  state = initialState,
  action: EuropaLeagueActionTypes
): FootballState {
  switch (action.type) {
    case C.GET_EUROPA_LEAGUE_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_EUROPA_LEAGUE_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        schedule: action.payload,
        today: action.sortedSchedule.today,
        upcoming: action.sortedSchedule.upcoming,
        completed: action.sortedSchedule.completed
      });
    case C.GET_EUROPA_LEAGUE_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case C.GET_EUROPA_LEAGUE_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_EUROPA_LEAGUE_TEAMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        teams: action.payload
      });
    case C.GET_EUROPA_LEAGUE_TEAMS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    // case A.GET_EUROPA_LEAGUE_VIDEOS_REQUEST:
    //   return Object.assign({}, state, { isFetching: true });
    // case A.GET_EUROPA_LEAGUE_VIDEOS_SUCCESS:
    //   return Object.assign({}, state, { isFetching: false, videos: action.payload });
    // case A.GET_EUROPA_LEAGUE_VIDEOS_FAILURE:
    //   return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default eplReducer;
