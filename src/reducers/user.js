import { AUTHORIZATION_SUCCESS, SIGN_OUT, AUTHORIZATION_FAIL, SET_USER_ID } from '../actions/user';

export const initialState = {
  randomId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
  userId: null,
  authToken: null,
  errorMessage: ''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION_SUCCESS:
      return {
        userId: action.payload
      };
    case SIGN_OUT:
    case AUTHORIZATION_FAIL:
      return {
        errorMessage: action.payload
      };

    default:
      return state;
  }
}

export default user;
