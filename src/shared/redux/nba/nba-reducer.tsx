import * as C from './nba-constants';
import { createYoutubeThumnailObjects } from '../../../helpers/utils';

const initialState = {
  isFetching: false,
  schedule: [],
  teams: [],
  gamesToday: [],
  upcoming: [],
  completed: [],
  videos: [],
  thumbnails: [],
  error: {}
};

function nbaReducer(state = initialState, action) {
  switch(action.type) {
    case C.GET_NBA_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_NBA_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          schedule: action.payload,
          gamesToday: action.sortedSchedule.gamesToday,
          upcoming: action.sortedSchedule.upcoming,
          completed: action.sortedSchedule.beforeToday
        });
    case C.GET_NBA_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case C.GET_NBA_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_NBA_TEAMS_SUCCESS:
      return Object.assign({}, state, { isFetching: false, teams: action.payload });
    case C.GET_NBA_TEAMS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case C.GET_NBA_VIDEOS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_NBA_VIDEOS_SUCCESS:
      return Object.assign({}, state, { 
        isFetching: false,
        videos: action.payload,
        thumbnails: createYoutubeThumnailObjects(action.payload) });
    case C.GET_NBA_VIDEOS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default nbaReducer;
