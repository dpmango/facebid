import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers/index';
import { loadState, saveState } from './localStorage';
import logger from 'redux-logger'
// import gtmMiddleware from './gtmMiddleware'

const initialState = loadState();

const createStoreWithMiddleware = compose(
  applyMiddleware(logger),
)(createStore);

const store = createStoreWithMiddleware(reducers, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


store.subscribe(() => {
  saveState(store.getState());
});

export default store;
