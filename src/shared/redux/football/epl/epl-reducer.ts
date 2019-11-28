import * as C from "./epl-constants";
import { FootballState } from "../football-types";
import { EplActionTypes } from "./epl-types";
import { createYoutubeThumnailObjects } from "../../../../helpers/utils";

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
  action: EplActionTypes
): FootballState {
  switch (action.type) {
    case C.GET_EPL_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_EPL_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        schedule: action.payload,
        today: action.sortedSchedule.today,
        upcoming: action.sortedSchedule.upcoming,
        completed: action.sortedSchedule.completed
      });
    case C.GET_EPL_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case C.GET_EPL_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_EPL_TEAMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        teams: action.payload
      });
    case C.GET_EPL_TEAMS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    // case A.GET_EPL_VIDEOS_REQUEST:
    //   return Object.assign({}, state, { isFetching: true });
    // case A.GET_EPL_VIDEOS_SUCCESS:
    //   return Object.assign({}, state, { isFetching: false, videos: action.payload });
    // case A.GET_EPL_VIDEOS_FAILURE:
    //   return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default eplReducer;
