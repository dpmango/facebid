import { SET_CLASS } from '../actions/page';

const initialState = {
  pageClass: ''
}

const page = (state = initialState, action) => {
  switch (action.type) {

    case SET_CLASS:
      return {
        pageClass: action.payload
      }

    default:
      return state;
  }
}

export default page;
