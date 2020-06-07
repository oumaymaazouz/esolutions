import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {authReducer} from '../components/Auth/state';
import {TicketsReducer} from '../components/Tickets/state';
import {laborReducer} from '../components/Labor/state';

let store;

export function getStore() {
  return store;
}

export function setUpStore() {
  const rootReducer = combineReducers({
    Auth: authReducer,
    Ticket: TicketsReducer,
    Labor: laborReducer,
  });

  store = createStore(rootReducer, applyMiddleware(thunk, logger));

  return {store};
}
