import { SET_GEOLOCATION } from '../actions/geolocation';

const initialState = {
  latitude: null,
  longitude: null,
  accuracy: null,
  timestamp: null
}

const geolocation = (state = initialState, action) => {
  switch (action.type) {
    case SET_GEOLOCATION:
      return action.payload

    default:
      return state;
  }
}

export default geolocation;
