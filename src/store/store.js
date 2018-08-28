import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import { loadState, saveState } from './localStorage';
import sagas from './sagas';
import logger from 'redux-logger';
// import gtmMiddleware from './gtmMiddleware'

const sagaMiddleware = createSagaMiddleware();

const initialState = loadState();

const createStoreWithMiddleware = compose(
  applyMiddleware(sagaMiddleware, logger),
)(createStore);

const store = createStoreWithMiddleware(reducers, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});

sagaMiddleware.run(sagas);

export default store;
