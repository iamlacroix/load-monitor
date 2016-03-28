import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import sagaMiddlewares from './sagaMiddlewares';
import rootReducer from '../reducers';

const enhancers = (process.env.NODE_ENV === 'production') ? () => (
  // Production

  compose(
    // Middleware you want to use in production:
    applyMiddleware(
      sagaMiddlewares,
    )
  )
) : () => {
  // Development

  const logger = createLogger({
    collapsed: true,
  });

  return compose(
    // Middleware you want to use in development
    applyMiddleware(
      sagaMiddlewares,
      logger
    ),
    // Other store enhancers if you use any
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
