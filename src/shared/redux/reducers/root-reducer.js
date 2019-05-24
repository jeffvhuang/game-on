import { combineReducers } from 'redux';
import dotaReducer from './dota-reducer';
import nbaReducer from './nba-reducer';
import eplReducer from './epl-reducer';
import championsLeagueReducer from './champions-league-reducer';
import europaLeagueReducer from './europa-league-reducer';
import tennisReducer from './tennis-reducer';
import lolReducer from './lol-reducer';

const rootReducer = combineReducers({
  dota: dotaReducer,
  nba: nbaReducer,
  epl: eplReducer,
  tennis: tennisReducer,
  lol: lolReducer,
  championsLeague: championsLeagueReducer,
  europaLeague: europaLeagueReducer
});

export default rootReducer;