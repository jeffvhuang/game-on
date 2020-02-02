import * as C from "./nba-constants";
import { NbaState, NbaActionTypes } from "./nba-types";
import { initialGameDetails } from "./nba-constants";
import { merge } from "../../../helpers/utils";

const initialState: NbaState = {
  isFetching: false,
  schedule: [],
  teams: [],
  gamesToday: [],
  upcoming: [],
  completed: [],
  gameDetails: initialGameDetails,
  error: {}
};

function nbaReducer(state = initialState, action: NbaActionTypes): NbaState {
  switch (action.type) {
    case C.GET_NBA_SCHEDULE_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_NBA_SCHEDULE_SUCCESS:
      return merge(state, {
        isFetching: false,
        schedule: action.payload,
        gamesToday: action.sortedSchedule.gamesToday,
        upcoming: action.sortedSchedule.upcoming,
        completed: action.sortedSchedule.beforeToday
      });
    case C.GET_NBA_SCHEDULE_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case C.GET_NBA_GAME_DETAILS_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_NBA_GAME_DETAILS_SUCCESS:
      return merge(state, { isFetching: false, gameDetails: action.payload });
    case C.GET_NBA_GAME_DETAILS_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case C.GET_NBA_TEAMS_REQUEST:
      return state;
    case C.GET_NBA_TEAMS_SUCCESS:
      return merge(state, { teams: action.payload });
    case C.GET_NBA_TEAMS_FAILURE:
      return merge(state, { error: action.err });

    default:
      return state;
  }
}

export default nbaReducer;
