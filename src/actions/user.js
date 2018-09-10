import api from '../services/Api';

export const LOG_IN = 'LOG_IN';
export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS';
export const AUTHORIZATION_FAIL = 'AUTHORIZATION_FAIL';
export const LOG_OUT = 'LOG_OUT';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const loginRequest = (data) => {
  return {
    type: LOG_IN,
    payload: data
  }
}

export const signupRequest = (data) => {
  return {
    type: SIGNUP_REQUEST,
    payload: data
  }
}

export const logIn = (payload) => (
  new Promise((resolve, reject) => {
    api
      .get('users')
      .then(res => {
        // dummy interation
        res.data.forEach( user => {
          if ( payload.email === user.email &&
             payload.password.toString() === user.password ){
            resolve();
          }
        })
      })
      .catch(err => {
        reject(new Error('Incorrect username or password.'));
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
