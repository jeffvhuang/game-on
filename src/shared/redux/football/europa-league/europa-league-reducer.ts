
import * as C from './europa-league-constants';
import { EuropaLeagueState, EuropaLeagueActionTypes } from './europa-league-types';
import { createYoutubeThumnailObjects } from '../../../../helpers/utils';

const initialState: EuropaLeagueState = {
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

function eplReducer(state = initialState, action: EuropaLeagueActionTypes): EuropaLeagueState {
  switch(action.type) {
    case C.GET_EUROPA_LEAGUE_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_EUROPA_LEAGUE_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          schedule: action.payload,
          gamesToday: action.sortedSchedule.gamesToday,
          upcoming: action.sortedSchedule.upcoming,
          completed: action.sortedSchedule.beforeToday
        });
    case C.GET_EUROPA_LEAGUE_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case C.GET_EUROPA_LEAGUE_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_EUROPA_LEAGUE_TEAMS_SUCCESS:
      return Object.assign({}, state, { isFetching: false, teams: action.payload });
    case C.GET_EUROPA_LEAGUE_TEAMS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
 
    // case A.GET_EUROPA_LEAGUE_VIDEOS_REQUEST:
    //   return Object.assign({}, state, { isFetching: true });
    // case A.GET_EUROPA_LEAGUE_VIDEOS_SUCCESS:
    //   return Object.assign({}, state, { isFetching: false, videos: action.payload });
    // case A.GET_EUROPA_LEAGUE_VIDEOS_FAILURE:
    //   return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default eplReducer;