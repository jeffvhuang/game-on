import { combineReducers } from 'redux';
import dotaReducer from './dota-reducer.js';

const rootReducer = combineReducers({
  dota: dotaReducer
});

export default rootReducer;