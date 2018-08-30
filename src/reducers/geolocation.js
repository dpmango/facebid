import { SET_GEOLOCATION, SET_IP_LOOKUP } from '../actions/geolocation';

const initialState = {
  latitude: null,
  longitude: null,
  accuracy: null,
  timestamp: null,
  iplookup: null // ip lookup
}

const geolocation = (state = initialState, action) => {
  switch (action.type) {
    case SET_GEOLOCATION:
      return action.payload
    case SET_IP_LOOKUP:
      return {
        ...state,
        iplookup: action.payload
      }

    default:
      return state;
  }
}

export default geolocation;
