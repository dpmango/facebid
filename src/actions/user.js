import api from '../services/Api';

export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const AUTHORIZATION_FAIL = 'AUTHORIZATION_FAIL';

export const logIn = (payload) => (
  new Promise((resolve, reject) => {
    api
      .get('users')
      .then(res => {
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
