import { tennisActions as A } from '../types/redux-types';
import { createYoutubeThumnailObjects } from '../../../helpers/utils';

const initialState = {
  isFetching: false,
  tournaments: [],
  ongoing: [],
  upcoming: [],
  completed: [],
  videos: [],
  thumbnails: [],
  // Following 2 always replaced with the recently selected tournament
  tournamentSchedule: [],
  tournamentInfo: {},
  error: {}
};

function tennisReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_TENNIS_TOURNAMENTS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_TENNIS_TOURNAMENTS_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          tournaments: action.schedule,
          ongoing: action.payload.ongoing,
          upcoming: action.payload.upcoming,
          completed: action.payload.completed
        });
    case A.GET_TENNIS_TOURNAMENTS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case A.GET_TENNIS_TOURNAMENT_SCHEDULE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_TENNIS_TOURNAMENT_SCHEDULE_SUCCESS:
      return Object.assign({}, state, 
        { isFetching: false, tournamentSchedule: action.payload });
    case A.GET_TENNIS_TOURNAMENT_SCHEDULE_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    case A.CLEAR_TENNIS_TOURNAMENT_SCHEDULE:
      return Object.assign({}, state, {  tournamentSchedule: [] });

    case A.GET_TENNIS_TOURNAMENT_INFO_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_TENNIS_TOURNAMENT_INFO_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, tournamentInfo: action.payload });
    case A.GET_TENNIS_TOURNAMENT_INFO_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    case A.CLEAR_TENNIS_TOURNAMENT_INFO:
      return Object.assign({}, state, { tournamentInfo: {} });
    
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
