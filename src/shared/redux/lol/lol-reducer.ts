import * as A from "./lol-constants";
import { LolState, LolActionTypes } from "./lol-types";
import { merge } from "../../../helpers/utils";

const initialState: LolState = {
  isFetching: false,
  series: [],
  selectedSeriesTournaments: [],
  tournaments: [],
  ongoing: [],
  upcoming: [],
  completed: [],
  tournamentMatches: [],
  matches: [],
  matchesTeams: [],
  teams: [],
  error: {}
};

function lolReducer(state = initialState, action: LolActionTypes): LolState {
  switch (action.type) {
    case A.GET_LOL_SERIES_REQUEST:
      return merge(state, { isFetching: true });
    case A.GET_LOL_SERIES_SUCCESS:
      return merge(state, {
        isFetching: false,
        series: action.payload
      });
    case A.GET_LOL_SERIES_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case A.GET_LOL_SERIES_TOURNAMENTS_REQUEST:
      return merge(state, { isFetching: true });
    case A.GET_LOL_SERIES_TOURNAMENTS_SUCCESS:
      return merge(state, {
        isFetching: false,
        selectedSeriesTournaments: action.payload
      });
    case A.GET_LOL_SERIES_TOURNAMENTS_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case A.GET_LOL_TOURNAMENTS_REQUEST:
      return merge(state, { isFetching: true });
    case A.GET_LOL_TOURNAMENTS_SUCCESS:
      return merge(state, {
        isFetching: false,
        tournaments: action.payload,
        ongoing: action.sortedTournaments.ongoing,
        upcoming: action.sortedTournaments.upcoming,
        completed: action.sortedTournaments.completed,
        teams: action.sortedTournaments.teams
      });
    case A.GET_LOL_TOURNAMENTS_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case A.GET_LOL_TOURNAMENT_MATCHES_REQUEST:
      return merge(state, { isFetching: true });
    case A.GET_LOL_TOURNAMENT_MATCHES_SUCCESS:
      return merge(state, {
        isFetching: false,
        tournamentMatches: action.payload
      });
    case A.GET_LOL_TOURNAMENT_MATCHES_FAILURE:
      return merge(state, { isFetching: false, error: action.err });
    case A.CLEAR_LOL_TOURNAMENT_MATCHES:
      return merge(state, { tournamentMatches: [] });

    case A.GET_LOL_MATCHES_REQUEST:
      return merge(state, { isFetching: true });
    case A.GET_LOL_MATCHES_SUCCESS:
      return merge(state, {
        isFetching: false,
        matches: action.payload,
        matchesTeams: action.matchesTeams
      });
    case A.GET_LOL_MATCHES_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case A.GET_LOL_TEAMS_REQUEST:
      return merge(state, { isFetching: true });
    case A.GET_LOL_TEAMS_SUCCESS:
      return merge(state, {
        isFetching: false,
        teams: action.payload
      });
    case A.GET_LOL_TEAMS_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default lolReducer;
