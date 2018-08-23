import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './css/app.css';

// This file is an entry point for the react app
// which render everything to the DOM

// hydrate / render switch is for react-snap "prerendering"
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}
