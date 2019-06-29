import { combineReducers } from 'redux';
import dotaReducer from './dota/dota-reducer';
import nbaReducer from './nba/nba-reducer';
import eplReducer from './football/epl/epl-reducer';
import championsLeagueReducer from './football/champions-league/champions-league-reducer';
import europaLeagueReducer from './football/europa-league/europa-league-reducer';
import tennisReducer from './tennis/tennis-reducer';
import lolReducer from './lol/lol-reducer';
import { DotaState } from './dota/dota-types';
import { NbaState } from './nba/nba-types';
import { EplState } from './football/epl/epl-types';
import { TennisState } from './tennis/tennis-types';
import { LolState } from './lol/lol-types';
import { ChampionsLeagueState } from './football/champions-league/champions-league-types';
import { EuropaLeagueState } from './football/europa-league/europa-league-types';

export interface ReduxState {
  dota: DotaState,
  nba: NbaState,
  epl: EplState,
  tennis: TennisState,
  lol: LolState,
  championsLeague: ChampionsLeagueState,
  europaLeague: EuropaLeagueState
}

const rootReducer = combineReducers<ReduxState>({
  dota: dotaReducer,
  nba: nbaReducer,
  epl: eplReducer,
  tennis: tennisReducer,
  lol: lolReducer,
  championsLeague: championsLeagueReducer,
  europaLeague: europaLeagueReducer
});

export default rootReducer;
// export type ReduxState = ReturnType<typeof rootReducer>