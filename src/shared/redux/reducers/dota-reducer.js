import { dotaActions as A } from '../actions/actions';

const initialState = {
  inProgress: false,
  data: [],
  selected: {}
};

function dotaReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_DOTA_DATA:
      return Object.assign({}, state, { inProgress: true, data: action.payload });

    default:
      return state;
  }
}

export default dotaReducer;