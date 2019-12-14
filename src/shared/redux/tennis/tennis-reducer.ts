import { TennisState, TennisActionTypes } from "./tennis-types";
import * as C from "./tennis-constants";
import { TennisTournamentInfo } from "../../../types/tennis-api/tennis-tournament-info.model";
import { sortTennisScheduleIntoRounds } from "../../../helpers/utils";

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
  videos: [],
  thumbnails: [],
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
      return Object.assign({}, state, { isFetching: true });
    case C.GET_TENNIS_TOURNAMENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tournaments: action.payload,
        ongoing: action.sortedTournaments.ongoing,
        upcoming: action.sortedTournaments.upcoming,
        completed: action.sortedTournaments.completed
      });
    case C.GET_TENNIS_TOURNAMENTS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case C.GET_TENNIS_TOURNAMENT_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_TENNIS_TOURNAMENT_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tournamentSchedule: action.payload,
        tournamentRounds: sortTennisScheduleIntoRounds(action.payload)
      });
    case C.GET_TENNIS_TOURNAMENT_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    case C.CLEAR_TENNIS_TOURNAMENT_SCHEDULE:
      return Object.assign({}, state, { tournamentSchedule: [] });

    case C.GET_TENNIS_TOURNAMENT_INFO_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_TENNIS_TOURNAMENT_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tournamentInfo: action.payload
      });
    case C.GET_TENNIS_TOURNAMENT_INFO_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    case C.CLEAR_TENNIS_TOURNAMENT_INFO:
      return Object.assign({}, state, { tournamentInfo: {} });

    case C.GET_TENNIS_MATCHES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_TENNIS_MATCHES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        matches: action.payload,
        liveMatches: action.sortedMatches.live,
        upcomingMatches: action.sortedMatches.upcoming,
        completedMatches: action.sortedMatches.completed
      });
    case C.GET_TENNIS_MATCHES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default tennisReducer;
