import { combineReducers } from 'redux';
import dotaReducer from './dota-reducer';
import nbaReducer from './nba-reducer';

const rootReducer = combineReducers({
  dota: dotaReducer,
  nba: nbaReducer
});

export default rootReducer;