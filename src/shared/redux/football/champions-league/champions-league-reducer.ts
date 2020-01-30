import * as C from "./champions-league-constants";
import { ChampionsLeagueActionTypes } from "./champions-league-types";
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

function championsLeagueReducer(
  state = initialState,
  action: ChampionsLeagueActionTypes
): FootballState {
  switch (action.type) {
    case C.GET_CHAMPIONS_LEAGUE_SCHEDULE_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_CHAMPIONS_LEAGUE_SCHEDULE_SUCCESS:
      return merge(state, {
        isFetching: false,
        schedule: action.payload,
        today: action.sortedSchedule.today,
        upcoming: action.sortedSchedule.upcoming,
        completed: action.sortedSchedule.completed
      });
    case C.GET_CHAMPIONS_LEAGUE_SCHEDULE_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_SUCCESS:
      return merge(state, {
        isFetching: false,
        live: action.payload
      });
    case C.GET_CHAMPIONS_LEAGUE_GAMES_LIVE_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case C.GET_CHAMPIONS_LEAGUE_TEAMS_REQUEST:
      return state;
    case C.GET_CHAMPIONS_LEAGUE_TEAMS_SUCCESS:
      return merge(state, { teams: action.payload });
    case C.GET_CHAMPIONS_LEAGUE_TEAMS_FAILURE:
      return merge(state, { error: action.err });

    default:
      return state;
  }
}

export default championsLeagueReducer;
