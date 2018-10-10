import { SET_CREATE_EVENT } from '../actions/create-event';

const initialState = {
  currentTab: 1,
  categories: [],
  departure: '',
  destination: '',
  languages: [],
  city: '',
  event_day: '',
  event_month: '',
  event_year: '',
  isGroupEvent: false,

  title: '',
  description: '',

  privacyComments: null,
  privacyDisplayMembers: null
}

const createEvent = (state = initialState, action) => {
  switch (action.type) {

    case SET_CREATE_EVENT:
      return action.payload

    default:
      return state;
  }
}

export default createEvent;
