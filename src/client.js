import 'babel-polyfill';
import 'isomorphic-fetch';
import './styles/defaults.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import createStore from './store/configureStore';

const store = createStore();

if (process.env.NODE_ENV === 'development') {
  global.store = store;
}

const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    rootEl
  );
};

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    );
  };
  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };
  module.hot.accept();
}

render();
