import { combineReducers } from 'redux';
import {reducer as notificationsReducer} from 'reapop';

import page from './page';
import lang from './lang';
import header from './header';
import user from './user';
import route from './route';
import onboarding from './onboarding';
import geolocation from './geolocation';
import modal from './modal';
import eventFilter from './event-filter';
import createEvent from './create-event';

export default combineReducers({
  page,
  lang,
  header,
  user,
  route,
  onboarding,
  geolocation,
  modal,
  eventFilter,
  createEvent,
  notifications: notificationsReducer()
})
