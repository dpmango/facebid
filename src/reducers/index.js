import { combineReducers } from 'redux';

import page from './page';
import header from './header';
import user from './user';
import geolocation from './geolocation';
import modal from './modal';
import eventFilter from './event-filter';

export default combineReducers({
  page,
  header,
  user,
  geolocation,
  modal,
  eventFilter
})
