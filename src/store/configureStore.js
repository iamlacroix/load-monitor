import { createStore, applyMiddleware, compose } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import sagaMiddleware from 'redux-saga';
import sagas from '../sagas';
import rootReducer from '../reducers';

const enhancers = (process.env.NODE_ENV === 'production') ? () => (
  // Production

  compose(
    // Middleware you want to use in production:
    applyMiddleware(
      sagaMiddleware(sagas),
    ),
    responsiveStoreEnhancer
  )
) : () => {
  // Development

  const createLogger = require('redux-logger');
  const logger = createLogger({
    collapsed: true,
  });

  const middlewares = process.env.DEBUG ? applyMiddleware(
    sagaMiddleware(sagas),
    logger
  ) : applyMiddleware(
    sagaMiddleware(sagas)
  );

  return compose(
    // Middleware you want to use in development
    middlewares,
    // Store enhancers
    responsiveStoreEnhancer,
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() : f => f,
  );
};


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancers());

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
