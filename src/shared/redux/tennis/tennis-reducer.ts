import { TennisState, TennisActionTypes } from "./tennis-types";
import * as C from "./tennis-constants";
import { TennisTournamentInfo } from "../../../types/tennis-api/tennis-tournament-info.model";
import { sortTennisScheduleIntoRounds, merge } from "../../../helpers/utils";

const initialState: TennisState = {
  isFetching: false,
  tournaments: [],
  ongoing: [],
  upcoming: [],
  completed: [],
  matches: [],
  liveMatches: [],
  upcomingMatches: [],
  completedMatches: [],
  // Following 2 always replaced with the recently selected tournament
  tournamentSchedule: [],
  tournamentRounds: [],
  tournamentInfo: {} as TennisTournamentInfo,
  error: {}
};

function tennisReducer(
  state = initialState,
  action: TennisActionTypes
): TennisState {
  switch (action.type) {
    case C.GET_TENNIS_TOURNAMENTS_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_TENNIS_TOURNAMENTS_SUCCESS:
      return merge(state, {
        isFetching: false,
        tournaments: action.payload,
        ongoing: action.sortedTournaments.ongoing,
        upcoming: action.sortedTournaments.upcoming,
        completed: action.sortedTournaments.completed
      });
    case C.GET_TENNIS_TOURNAMENTS_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    case C.GET_TENNIS_TOURNAMENT_SCHEDULE_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_TENNIS_TOURNAMENT_SCHEDULE_SUCCESS:
      return merge(state, {
        isFetching: false,
        tournamentSchedule: action.payload,
        tournamentRounds: sortTennisScheduleIntoRounds(action.payload)
      });
    case C.GET_TENNIS_TOURNAMENT_SCHEDULE_FAILURE:
      return merge(state, { isFetching: false, error: action.err });
    case C.CLEAR_TENNIS_TOURNAMENT_SCHEDULE:
      return merge(state, { tournamentSchedule: [] });

    case C.GET_TENNIS_TOURNAMENT_INFO_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_TENNIS_TOURNAMENT_INFO_SUCCESS:
      return merge(state, {
        isFetching: false,
        tournamentInfo: action.payload
      });
    case C.GET_TENNIS_TOURNAMENT_INFO_FAILURE:
      return merge(state, { isFetching: false, error: action.err });
    case C.CLEAR_TENNIS_TOURNAMENT_INFO:
      return merge(state, { tournamentInfo: {} });

    case C.GET_TENNIS_MATCHES_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_TENNIS_MATCHES_SUCCESS:
      return merge(state, {
        isFetching: false,
        matches: action.payload,
        liveMatches: action.sortedMatches.live,
        upcomingMatches: action.sortedMatches.upcoming,
        completedMatches: action.sortedMatches.completed
      });
    case C.GET_TENNIS_MATCHES_FAILURE:
      return merge(state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default tennisReducer;
