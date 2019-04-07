import { dotaActions as A } from '../actions/action-types';

const initialState = {
  isFetching: false,
  data: [],
  leagues: [],
  proMatches: [],
  teams: []
};

function dotaReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_DOTA_DATA:
      return Object.assign({}, state, { isFetching: true, data: action.payload });

    case A.GET_DOTA_LEAGUES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_LEAGUES_SUCCESS:
      return Object.assign({}, state, { isFetching: false, leagues: action.payload });
    case A.GET_DOTA_LEAGUES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case A.GET_DOTA_PRO_MATCHES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_PRO_MATCHES_SUCCESS:
      return Object.assign({}, state, { isFetching: false, proMatches: action.payload });
    case A.GET_DOTA_PRO_MATCHES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case A.GET_DOTA_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_TEAMS_SUCCESS:
      return Object.assign({}, state, { isFetching: false, teams: action.payload });
    case A.GET_DOTA_TEAMS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default dotaReducer;
