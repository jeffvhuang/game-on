import { dotaActions as A } from '../actions/actions';

const initialState = {
  inProgress: false,
  data: [],
  leagues: [],
  proMatches: [],
  selected: {}
};

function dotaReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_DOTA_DATA:
      return Object.assign({}, state, { inProgress: true, data: action.payload });

    case A.GET_DOTA_LEAGUES_REQUEST:
      return Object.assign({}, state, { inProgress: true });
    case A.GET_DOTA_LEAGUES_SUCCESS:
      return Object.assign({}, state, { inProgress: false, leagues: action.payload });
    case A.GET_DOTA_LEAGUES_FAILURE:
      return Object.assign({}, state, { inProgress: false, error: action.payload });

    case A.GET_DOTA_PRO_MATCHES_REQUEST:
      return Object.assign({}, state, { inProgress: true });
    case A.GET_DOTA_PRO_MATCHES_SUCCESS:
      return Object.assign({}, state, { inProgress: false, proMatches: action.payload });
    case A.GET_DOTA_PRO_MATCHES_FAILURE:
      return Object.assign({}, state, { inProgress: false, error: action.payload });

    default:
      return state;
  }
}

export default dotaReducer;
