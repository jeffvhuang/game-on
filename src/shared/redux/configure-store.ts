import { createStore, compose, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import rootReducer from './root-reducer';
import { ReduxState } from './redux-state';

// const store = createStore<ReduxState, any, any, any>(
//   rootReducer,
//   undefined,
//   composeEnhancers(
//     applyMiddleware(thunk, logger)
//   )
// );

// export default store;

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<ReduxState> {
  const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);
  // const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
  const composeEnhancers = compose(middlewareEnhancer);
  // const initialState = {};
  const initialState = undefined;

  const store = createStore(rootReducer, initialState, composeEnhancers);

  return store;
}