export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_MODAL_OPTIONS = 'SET_MODAL_OPTIONS';

export const openModal = (data) => ({
  type: OPEN_MODAL,
  payload: data
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})

export const setModalOptions = (data) => ({
  type: SET_MODAL_OPTIONS,
  payload: data
})
