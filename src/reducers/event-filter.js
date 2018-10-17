import { SET_FILTER_PARAMS } from '../actions/event-filter';

const initialState = {
  isOpened: false,
  eventName: '',
  gender: "Всех",
  age: [24, 32],
  city: '',
  range: 20,
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
