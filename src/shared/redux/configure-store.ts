import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';
import { ReduxState } from './redux-state';

// Create a configure store function of type `ReduxState`
export default function configureStore(preloadedState): Store<ReduxState> {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  
  const enhancers = [middlewareEnhancer];
  const composeEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composeEnhancers);

  return store;
}