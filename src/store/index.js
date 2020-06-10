import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {authReducer} from '../components/Auth/state';
import {TicketsReducer} from '../components/Tickets/state';
import {laborReducer} from '../components/Labor/state';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 0,
};

let store;
let persistedReducer;
let persistor;

export function getStore() {
  return store;
}

export function getPersistor() {
  return persistor;
}

export function setUpStore() {
  const rootReducer = combineReducers({
    Auth: authReducer,
    Ticket: TicketsReducer,
    Labor: laborReducer,
  });
  persistedReducer = persistReducer(persistConfig, rootReducer);
  store = createStore(persistedReducer, applyMiddleware(thunk, logger));
  persistor = persistStore(store);
  return {store, persistor};
}
