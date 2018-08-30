import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

const initialState = {
  activeModal: null
}

const modal = (state = initialState, action) => {
  switch (action.type) {

    case OPEN_MODAL:
      return {
        activeModal: action.payload
      }

    case CLOSE_MODAL:
      return {
        activeModal: null
      }

    default:
      return state;
  }
}

export default modal;
