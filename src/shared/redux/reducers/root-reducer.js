import { combineReducers } from 'redux';
import dotaReducer from './dota-reducer';
import nbaReducer from './nba-reducer';
import eplReducer from './epl-reducer';

const rootReducer = combineReducers({
  dota: dotaReducer,
  nba: nbaReducer,
  epl: eplReducer
});

export default rootReducer;