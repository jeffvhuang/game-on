import { basketballActions as A } from '../actions/action-types';

const initialState = {
  inProgress: false,
  nba: { schedule: [] },
  selected: {}
};

function basketballReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_NBA_SCHEDULE_REQUEST:
      return Object.assign({}, state, { inProgress: true });
    case A.GET_NBA_SCHEDULE_SUCCESS:
      return Object.assign({}, state, { inProgress: false, nba: { ...state.nba, schedule: action.payload } });
    case A.GET_NBA_SCHEDULE_FAILURE:
      return Object.assign({}, state, { inProgress: false, error: action.payload });

    default:
      return state;
  }
}

export default basketballReducer;
