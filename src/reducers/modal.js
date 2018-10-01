import { OPEN_MODAL, CLOSE_MODAL, SET_MODAL_OPTIONS } from '../actions/modal';

const initialState = {
  activeModal: null,
  modalOptions: null
}

const modal = (state = initialState, action) => {
  switch (action.type) {

    case OPEN_MODAL:
      const payloadType = typeof(action.payload)
      if ( payloadType === "string" ){
        return {
          activeModal: action.payload,
          modalOptions: null
        }
      } else if ( payloadType === "object" ){
        return {
          activeModal: action.payload.name,
          modalOptions: action.payload.options
        }
      }

    case SET_MODAL_OPTIONS:
      return {
        ...state,
        modalOptions: action.payload
      }

    case CLOSE_MODAL:
      return {
        activeModal: null,
        modalOptions: null
      }

    default:
      return state;
  }
}

export default modal;
