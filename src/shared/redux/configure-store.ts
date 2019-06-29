import { createStore, compose, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './root-reducer';
import { ReduxState } from './redux-state';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const initialState = {};

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
  const store = createStore(rootReducer, undefined, composeEnhancers(
    applyMiddleware(thunk, logger)
  ));
  return store;
}