import { OPEN_MENU, CLOSE_MENU } from '../actions/header';

const initialState = {
  menuOpened: false
}

const header = (state = initialState, action) => {
  switch (action.type) {

    case OPEN_MENU:
      return {
        ...state,
        menuOpened: true
      }

    case CLOSE_MENU:
      return {
        ...state,
        menuOpened: false
      }

    default:
      return state;
  }
}

export default header;
