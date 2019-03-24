import { combineReducers } from 'redux';
import dotaReducer from './dota-reducer';
import basketballReducer from './basketball-reducer';

const rootReducer = combineReducers({
  dota: dotaReducer,
  basketball: basketballReducer
});

export default rootReducer;