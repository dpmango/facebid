export const SET_CREATE_EVENT = 'SET_CREATE_EVENT';
export const RESET_CREATE_EVENT = 'RESET_CREATE_EVENT';

export const setCreateEvent = (data) => ({
  type: SET_CREATE_EVENT,
  payload: data
})

export const resetCreateEvent = () => ({
  type: RESET_CREATE_EVENT
})
