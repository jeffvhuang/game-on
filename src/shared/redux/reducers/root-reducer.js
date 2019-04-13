import { combineReducers } from 'redux';
import dotaReducer from './dota-reducer';
import nbaReducer from './nba-reducer';
import eplReducer from './epl-reducer';
import tennisReducer from './tennis-reducer';

const rootReducer = combineReducers({
  dota: dotaReducer,
  nba: nbaReducer,
  epl: eplReducer,
  tennis: tennisReducer
});

export default rootReducer;