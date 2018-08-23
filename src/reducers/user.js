import { SET_USER_ID } from '../actions/user';

export const initialState = {
  randomId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
  userId: null,
  authToken: null
}

const user = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      }

    default:
      return state;
  }
}

export default user;
