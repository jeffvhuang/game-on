import * as A from './csgo-constants';
import { CsgoState, CsgoActionTypes } from './csgo-types';

const initialState: CsgoState = {
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

function csgoReducer(state = initialState, action: CsgoActionTypes): CsgoState {
  switch (action.type) {
    case A.GET_CSGO_TOURNAMENTS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_CSGO_TOURNAMENTS_SUCCESS:
      return Object.assign({}, state,
        {
          isFetching: false,
          tournaments: action.payload,
          ongoing: action.sortedTournaments.ongoing,
          upcoming: action.sortedTournaments.upcoming,
          completed: action.sortedTournaments.completed,
          teams: action.sortedTournaments.teams
        });
    case A.GET_CSGO_TOURNAMENTS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case A.GET_CSGO_TOURNAMENT_MATCHES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_CSGO_TOURNAMENT_MATCHES_SUCCESS:
      return Object.assign({}, state, { isFetching: false, tournamentMatches: action.payload });
    case A.GET_CSGO_TOURNAMENT_MATCHES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    case A.CLEAR_CSGO_TOURNAMENT_MATCHES:
      return Object.assign({}, state, { tournamentMatches: [] });

    case A.GET_CSGO_MATCHES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_CSGO_MATCHES_SUCCESS:
      return Object.assign({}, state, { isFetching: false, matches: action.payload, matchesTeams: action.matchesTeams });
    case A.GET_CSGO_MATCHES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    // case A.GET_CSGO_TEAMS_REQUEST:
    //   return Object.assign({}, state, { isFetching: true });
    // case A.GET_CSGO_TEAMS_SUCCESS:
    //   return Object.assign({}, state, { isFetching: false, teams: action.payload });
    // case A.GET_CSGO_TEAMS_FAILURE:
    //   return Object.assign({}, state, { isFetching: false, error: action.err });

    // case A.GET_CSGO_VIDEOS_REQUEST:
    //   return Object.assign({}, state, { isFetching: true });
    // case A.GET_CSGO_VIDEOS_SUCCESS:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     videos: action.payload,
    //     thumbnails: createYoutubeThumnailObjects(action.payload)
    //   });
    // case A.GET_CSGO_VIDEOS_FAILURE:
    //   return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default csgoReducer;
