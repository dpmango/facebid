import { AUTHORIZATION_REQUEST, AUTHORIZATION_SUCCESS, AUTHORIZATION_FAIL, AUTHORIZATION_CLEAR_ERROR,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL, LOG_OUT } from '../actions/user';

export const initialState = {
  randomId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
  userId: null,
  userDetails: {},
  authToken: null,
  loginError: '',
  signupError: '',
  signupDone: false
  // do we need to store signup params in redux ?
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION_REQUEST:
      return {
        ...state,
        loginError: ''
      }
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        userId: action.payload.id,
        userDetails: {
          email: action.payload.email,
          avatar: action.payload.avatar,
          username: action.payload.username,
          fullname: action.payload.fullname
        },
        // loginError: ''
      };
    case AUTHORIZATION_FAIL:
      return {
        ...state,
        loginError: action.payload
      };
    case AUTHORIZATION_CLEAR_ERROR:
      return {
        ...state,
        loginError: ''
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        signupError: ''
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        // TODO - what to do on sucess ?
        // maybe autologin
        signupDone: true,
        // signupError: ''
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        signupError: action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        userId: null
      }
    default:
      return state;
  }
}

export default user;
