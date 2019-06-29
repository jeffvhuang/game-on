
import * as C from './champions-league-constants';
import { createYoutubeThumnailObjects } from '../../../../helpers/utils';
import { ChampionsLeagueState, ChampionsLeagueActionTypes } from './champions-league-types';

const initialState: ChampionsLeagueState = {
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

function championsLeagueReducer(state = initialState, action: ChampionsLeagueActionTypes): ChampionsLeagueState {
  switch(action.type) {
    case C.GET_CHAMPIONS_LEAGUE_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_CHAMPIONS_LEAGUE_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          schedule: action.payload,
          gamesToday: action.sortedSchedule.gamesToday,
          upcoming: action.sortedSchedule.upcoming,
          completed: action.sortedSchedule.beforeToday
        });
    case C.GET_CHAMPIONS_LEAGUE_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case C.GET_CHAMPIONS_LEAGUE_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_CHAMPIONS_LEAGUE_TEAMS_SUCCESS:
      return Object.assign({}, state, { isFetching: false, teams: action.payload });
    case C.GET_CHAMPIONS_LEAGUE_TEAMS_FAILURE:
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

    default:
      return state;
  }
}

export default championsLeagueReducer;
