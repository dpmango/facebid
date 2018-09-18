import api from '../services/Api';

export const AUTHORIZATION_REQUEST = 'AUTHORIZATION_REQUEST';
export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS';
export const AUTHORIZATION_FAIL = 'AUTHORIZATION_FAIL';
export const AUTHORIZATION_CLEAR_ERROR = 'AUTHORISZATION_CLEAR_ERROR'
export const LOG_OUT = 'LOG_OUT';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const loginRequest = (data) => {
  return {
    type: AUTHORIZATION_REQUEST,
    payload: data
  }
}

export const signupRequest = (data) => {
  return {
    type: SIGNUP_REQUEST,
    payload: data
  }
}

export const clearAuthError = () => {
  return {
    type: AUTHORIZATION_CLEAR_ERROR
  }
}

export const logIn = (payload) => (
  new Promise((resolve, reject) => {
    api
      .get(`users?email=${payload.email}`)
      .then(res => {

        // TODO
        // should get flag from server on production
        const userData = res.data[res.data.length - 1]
        if ( payload.password.toString() ===
             userData.password ){
          resolve(userData);
        }
      })
      .catch(err => {
        reject(new Error('Неверное имя пользователя или пароль'));
      })
  })
);

export const signUp = (payload) => (
  new Promise((resolve, reject) => {
    api
      .post('users', payload)
      .then(res => {
        resolve();
      })
      .catch(err => {
        reject(new Error(`Error occured ${err}`));
      })
  })
);

export const logOut = () => {
  return {
    type: LOG_OUT
  }
}
