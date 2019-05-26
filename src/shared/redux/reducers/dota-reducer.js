import { dotaActions as A } from '../actions/action-types';
import { createYoutubeThumnailObjects } from '../../../helpers/utils';

const initialState = {
  isFetching: false,
  data: [],
  tournaments: [],
  matches: [],
  matchesToday: [],
  upcoming: [],
  completed: [],
  teams: [],
  videos: [],
  thumbnails: []
};

function dotaReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_DOTA_TOURNAMENTS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_TOURNAMENTS_SUCCESS:
    return Object.assign({}, state, { isFetching: false, tournaments: action.payload });
    case A.GET_DOTA_TOURNAMENTS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case A.GET_DOTA_MATCHES_REQUEST:
        return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_MATCHES_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          matches: action.matches,
          matchesToday: action.payload.matchesToday,
          upcoming: action.payload.upcoming,
          completed: action.payload.beforeToday
        });
    case A.GET_DOTA_MATCHES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case A.GET_DOTA_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_TEAMS_SUCCESS:
      return Object.assign({}, state, { isFetching: false, teams: action.payload });
    case A.GET_DOTA_TEAMS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case A.GET_DOTA_VIDEOS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_VIDEOS_SUCCESS:
      return Object.assign({}, state, { 
        isFetching: false,
        videos: action.payload,
        thumbnails: createYoutubeThumnailObjects(action.payload) });
    case A.GET_DOTA_VIDEOS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });


    default:
      return state;
  }
}

export default dotaReducer;
