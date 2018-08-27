import { combineReducers } from 'redux';

import header from './header';
import user from './user';
import geolocation from './geolocation';

export default combineReducers({
  header,
  user,
  geolocation
})
