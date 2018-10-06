import { call, put, takeLatest } from 'redux-saga/effects';
import { logIn, signUp } from 'actions/user';
import { openModal, closeModal } from 'actions/modal';
import { openOnboarding } from 'actions/onboarding';
import { redirectRouteStart } from 'actions/route';
import { AUTHORIZATION_REQUEST, AUTHORIZATION_SUCCESS, AUTHORIZATION_FAIL,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/user'

function* logInSaga({ payload }) {
  try {
    const res = yield call(logIn, payload);
    yield [
      put({ type: AUTHORIZATION_SUCCESS, payload: res }),
      put(redirectRouteStart())
    ]
  } catch (error) {
    yield put({ type: AUTHORIZATION_FAIL, payload: error.message, error: true });
  }
}

function* signUpSaga({ payload }) {
  try {
    yield call(signUp, payload);
    yield [
      put({ type: SIGNUP_SUCCESS, payload: payload.email }),
      put(closeModal()),
      put(openOnboarding()),
      put(openModal('login'))
    ]
  } catch (error) {
    yield put({ type: SIGNUP_FAIL, payload: error.message, error: true });
  }
}

export default function* () {
  yield takeLatest(AUTHORIZATION_REQUEST, logInSaga);
  yield takeLatest(SIGNUP_REQUEST, signUpSaga);
}
