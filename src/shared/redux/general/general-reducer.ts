import * as C from './general-constants';
import { GeneralState, GeneralActionTypes } from './general-types';

const initialState: GeneralState = {
  isFetching: false,
  recentlyCompletedEvents: [],
  liveEvents: [],
  upcomingEvents: [],
  error: {}
}

function generalReducer(state = initialState, action: GeneralActionTypes): GeneralState {
  switch(action.type) {
    case C.GET_EVENTS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case C.GET_EVENTS_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          recentlyCompletedEvents: action.payload.recentlyCompleted,
          liveEvents: action.payload.live,
          upcomingEvents: action.payload.upcoming
        });
    case C.GET_EVENTS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    default:
      return state;
  }
}

export default generalReducer;
