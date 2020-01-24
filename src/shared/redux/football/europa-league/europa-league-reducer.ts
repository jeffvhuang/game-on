import * as C from "./europa-league-constants";
import { EuropaLeagueActionTypes } from "./europa-league-types";
import { FootballState } from "../football-types";
import { merge } from "../../../../helpers/utils";

const initialState: FootballState = {
  isFetching: false,
  schedule: [],
  teams: [],
  today: [],
  upcoming: [],
  completed: [],
  thumbnails: [],
  error: {}
};

function eplReducer(
  state = initialState,
  action: EuropaLeagueActionTypes
): FootballState {
  switch (action.type) {
    case C.GET_EUROPA_LEAGUE_SCHEDULE_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_EUROPA_LEAGUE_SCHEDULE_SUCCESS:
      return merge(state, {
        isFetching: false,
        schedule: action.payload,
        today: action.sortedSchedule.today,
        upcoming: action.sortedSchedule.upcoming,
        completed: action.sortedSchedule.completed
      });
    case C.GET_EUROPA_LEAGUE_SCHEDULE_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case C.GET_EUROPA_LEAGUE_TEAMS_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_EUROPA_LEAGUE_TEAMS_SUCCESS:
      return merge(state, {
        isFetching: false,
        teams: action.payload
      });
    case C.GET_EUROPA_LEAGUE_TEAMS_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    // case A.GET_EUROPA_LEAGUE_VIDEOS_REQUEST:
    //   return merge(state, { isFetching: true });
    // case A.GET_EUROPA_LEAGUE_VIDEOS_SUCCESS:
    //   return merge(state, { isFetching: false, videos: action.payload });
    // case A.GET_EUROPA_LEAGUE_VIDEOS_FAILURE:
    //   return merge(state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default eplReducer;
