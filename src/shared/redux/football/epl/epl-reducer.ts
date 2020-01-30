import * as C from "./epl-constants";
import { FootballState } from "../football-types";
import { EplActionTypes } from "./epl-types";
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
  action: EplActionTypes
): FootballState {
  switch (action.type) {
    case C.GET_EPL_SCHEDULE_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_EPL_SCHEDULE_SUCCESS:
      return merge(state, {
        isFetching: false,
        schedule: action.payload,
        today: action.sortedSchedule.today,
        upcoming: action.sortedSchedule.upcoming,
        completed: action.sortedSchedule.completed
      });
    case C.GET_EPL_SCHEDULE_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case C.GET_EPL_TEAMS_REQUEST:
      return state;
    case C.GET_EPL_TEAMS_SUCCESS:
      return merge(state, { teams: action.payload });
    case C.GET_EPL_TEAMS_FAILURE:
      return merge(state, { error: action.err });

    default:
      return state;
  }
}

export default eplReducer;
