import { combineReducers } from 'redux';
import {reducer as notificationsReducer} from 'reapop';

import page from './page';
import header from './header';
import user from './user';
import geolocation from './geolocation';
import modal from './modal';
import eventFilter from './event-filter';
import createEvent from './create-event';

export default combineReducers({
  page,
  header,
  user,
  geolocation,
  modal,
  eventFilter,
  createEvent,
  notifications: notificationsReducer()
})
