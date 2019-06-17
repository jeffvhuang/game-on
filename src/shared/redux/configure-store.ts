import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, logger)
  )
);

export default store;