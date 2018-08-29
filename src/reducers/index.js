import { combineReducers } from 'redux';

import page from './page';
import header from './header';
import user from './user';
import geolocation from './geolocation';

export default combineReducers({
  page,
  header,
  user,
  geolocation
})
