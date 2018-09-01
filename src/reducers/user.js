import { AUTHORIZATION_SUCCESS, SIGN_OUT, AUTHORIZATION_FAIL, SET_USER_ID, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/user';

export const initialState = {
  randomId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
  userId: null,
  userDetails: {},
  authToken: null,
  errorMessage: '',
  signupDone: false
  // do we need to store signup params in redux ?
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        userId: action.payload
      };
    case SIGN_OUT:
    case AUTHORIZATION_FAIL:
      return {
        ...state,
        errorMessage: action.payload
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupDone: true
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        errorMessage: action.payload
      };

    default:
      return state;
  }
}

export default user;
