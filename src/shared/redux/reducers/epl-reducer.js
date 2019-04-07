
import { eplActions as A } from '../actions/action-types';

const initialState = {
  isFetching: false,
  schedule: [],
  teams: [],
  gamesToday: [],
  upcoming: [],
  completed: [],
  videos: []
};

function eplReducer(state = initialState, action) {
  switch(action.type) {
    // case A.GET_EPL_SCHEDULE_REQUEST:
    //   return Object.assign({}, state, { isFetching: true });
    // case A.GET_EPL_SCHEDULE_SUCCESS:
    //   return Object.assign({}, state,
    //     { 
    //       isFetching: false,
    //       schedule: action.schedule,
    //       gamesToday: action.payload.gamesToday,
    //       upcoming: action.payload.upcoming,
    //       completed: action.payload.beforeToday
    //     });
    // case A.GET_EPL_SCHEDULE_FAILURE:
    //   return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case A.GET_EPL_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_EPL_TEAMS_SUCCESS:
      return Object.assign({}, state, { isFetching: false, teams: action.payload });
    case A.GET_EPL_TEAMS_FAILURE:
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
