import { tennisActions as A } from '../actions/action-types';
import { createYoutubeThumnailObjects } from '../../../helpers/utils';

const initialState = {
  isFetching: false,
  schedule: [],
  ongoing: [],
  upcoming: [],
  completed: [],
  videos: [],
  thumbnails: [],
  tournamentSchedules: [],
  tournamentInfo: []
};

function tennisReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_TENNIS_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_TENNIS_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          schedule: action.schedule,
          ongoing: action.payload.ongoing,
          upcoming: action.payload.upcoming,
          completed: action.payload.completed
        });
    case A.GET_TENNIS_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case A.GET_TENNIS_TOURNAMENT_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_TENNIS_TOURNAMENT_SCHEDULE_SUCCESS:
      return Object.assign({}, state, 
        { isFetching: false, tournamentSchedules: [...state.tournamentSchedules, action.payload] });
    case A.GET_TENNIS_TOURNAMENT_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case A.GET_TENNIS_TOURNAMENT_INFO_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_TENNIS_TOURNAMENT_INFO_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, tournamentInfo: [...state.tournamentInfo, action.payload] });
    case A.GET_TENNIS_TOURNAMENT_INFO_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    // case A.GET_NBA_VIDEOS_REQUEST:
    //   return Object.assign({}, state, { isFetching: true });
    // case A.GET_NBA_VIDEOS_SUCCESS:
    //   return Object.assign({}, state, { 
    //     isFetching: false,
    //     videos: action.payload,
    //     thumbnails: createYoutubeThumnailObjects(action.payload) });
    // case A.GET_NBA_VIDEOS_FAILURE:
    //   return Object.assign({}, state, { isFetching: false, error: action.err });

    default:
      return state;
  }
}

export default tennisReducer;
