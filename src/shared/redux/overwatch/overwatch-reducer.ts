import * as A from './overwatch-constants';
import { OverwatchState, OverwatchActionTypes } from './overwatch-types';

const initialState: OverwatchState = {
  isFetching: false,
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

function overwatchReducer(state = initialState, action: OverwatchActionTypes): OverwatchState {
  switch (action.type) {
    case A.GET_OVERWATCH_TOURNAMENTS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_OVERWATCH_TOURNAMENTS_SUCCESS:
      return Object.assign({}, state,
        {
          isFetching: false,
          tournaments: action.payload,
          ongoing: action.sortedTournaments.ongoing,
          upcoming: action.sortedTournaments.upcoming,
          completed: action.sortedTournaments.completed,
          teams: action.sortedTournaments.teams
        });
    case A.GET_OVERWATCH_TOURNAMENTS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case A.GET_OVERWATCH_TOURNAMENT_MATCHES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_OVERWATCH_TOURNAMENT_MATCHES_SUCCESS:
      return Object.assign({}, state, { isFetching: false, tournamentMatches: action.payload });
    case A.GET_OVERWATCH_TOURNAMENT_MATCHES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    case A.CLEAR_OVERWATCH_TOURNAMENT_MATCHES:
      return Object.assign({}, state, { tournamentMatches: [] });

    case A.GET_OVERWATCH_MATCHES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_OVERWATCH_MATCHES_SUCCESS:
      return Object.assign({}, state, { isFetching: false, matches: action.payload, matchesTeams: action.matchesTeams });
    case A.GET_OVERWATCH_MATCHES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default overwatchReducer;
