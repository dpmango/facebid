import { SET_FILTER_PARAMS } from '../actions/event-filter';

const initialState = {
  isOpened: false,
  eventName: '',
  gender: null,
  range: 20,
  age: null,
  languages: [],
  categories: [1]
}

const eventFilter = (state = initialState, action) => {
  switch (action.type) {

    case SET_FILTER_PARAMS:
      return action.payload

    default:
      return state;
  }
}

export default eventFilter;
