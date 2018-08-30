export const SET_GEOLOCATION = 'SET_GEOLOCATION';
export const SET_IP_LOOKUP = 'SET_IP_LOOKUP';

export const setGeolocation = (data) => ({
  type: SET_GEOLOCATION,
  payload: data
})

export const setIpLookup = (data) => ({
  type: SET_IP_LOOKUP,
  payload: data
})
