import { basketballActions as A } from '../actions/action-types';

const initialState = {
  inProgress: false,
  nba: { schedule: [], teams: [], gamesToday: [], upcoming: [], completed: [] },
  selected: {}
};

function basketballReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_NBA_SCHEDULE_REQUEST:
      return Object.assign({}, state, { inProgress: true });
    case A.GET_NBA_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        { 
          inProgress: false,
          nba: { 
            ...state.nba,
            schedule: action.schedule,
            gamesToday: action.payload.gamesToday,
            upcoming: action.payload.upcoming,
            completed: action.payload.beforeToday
          }
        });
    case A.GET_NBA_SCHEDULE_FAILURE:
      return Object.assign({}, state, { inProgress: false, error: action.payload });
    
    case A.GET_NBA_TEAMS_REQUEST:
      return Object.assign({}, state, { inProgress: true });
    case A.GET_NBA_TEAMS_SUCCESS:
      return Object.assign({}, state, { inProgress: false, nba: { ...state.nba, teams: action.payload } });
    case A.GET_NBA_TEAMS_FAILURE:
      return Object.assign({}, state, { inProgress: false, error: action.payload });

    default:
      return state;
  }
}

export default basketballReducer;
