import { combineReducers, Reducer } from 'redux';
import dotaReducer from './dota/dota-reducer';
import nbaReducer from './nba/nba-reducer';
import eplReducer from './football/epl/epl-reducer';
import championsLeagueReducer from './football/champions-league/champions-league-reducer';
import europaLeagueReducer from './football/europa-league/europa-league-reducer';
import tennisReducer from './tennis/tennis-reducer';
import lolReducer from './lol/lol-reducer';
import { ReduxState } from './redux-state';

const rootReducer: Reducer<ReduxState> = combineReducers<ReduxState>({
  dota: dotaReducer,
  nba: nbaReducer,
  epl: eplReducer,
  tennis: tennisReducer,
  lol: lolReducer,
  championsLeague: championsLeagueReducer,
  europaLeague: europaLeagueReducer
});

export default rootReducer;
