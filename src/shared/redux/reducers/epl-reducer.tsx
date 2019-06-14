
import { eplActions as A, championsLeagueActions as C, europaLeagueActions as E } from '../actions/action-types';
import { createYoutubeThumnailObjects } from '../../../helpers/utils';

const initialState = {
  isFetching: false,
  schedule: [],
  teams: [],
  gamesToday: [],
  upcoming: [],
  completed: [],
  videos: [],
  thumbnails: []
};

function eplReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_EPL_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_EPL_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          schedule: action.schedule,
          gamesToday: action.payload.gamesToday,
          upcoming: action.payload.upcoming,
          completed: action.payload.beforeToday
        });
    case A.GET_EPL_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case A.GET_EPL_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_EPL_TEAMS_SUCCESS:
      return Object.assign({}, state, { isFetching: false, teams: action.payload });
    case A.GET_EPL_TEAMS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case C.GET_CHAMPIONS_LEAGUE_VIDEOS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_CHAMPIONS_LEAGUE_VIDEOS_SUCCESS:
      return Object.assign({}, state, { 
        isFetching: false, 
        videos: [...state.videos].concat(action.payload),
        thumbnails: [...state.thumbnails].concat(createYoutubeThumnailObjects(action.payload)) });
    case C.GET_CHAMPIONS_LEAGUE_VIDEOS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case E.GET_EUROPA_LEAGUE_VIDEOS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case E.GET_EUROPA_LEAGUE_VIDEOS_SUCCESS:
      return Object.assign({}, state, { 
        isFetching: false, 
        videos: [...state.videos].concat(action.payload),
        thumbnails: [...state.thumbnails].concat(createYoutubeThumnailObjects(action.payload)) });
    case E.GET_EUROPA_LEAGUE_VIDEOS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    // case A.GET_EPL_VIDEOS_REQUEST:
    //   return Object.assign({}, state, { isFetching: true });
    // case A.GET_EPL_VIDEOS_SUCCESS:
    //   return Object.assign({}, state, { isFetching: false, videos: action.payload });
    // case A.GET_EPL_VIDEOS_FAILURE:
    //   return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default eplReducer;
