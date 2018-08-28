import { call, put, takeLatest } from 'redux-saga/effects';
import { logIn } from '../actions/user';

function* logInSaga({ payload }) {
  try {
    yield call(logIn, payload);
    yield put({ type: 'AUTHORIZATION_SUCCESS', payload: payload.email });
  } catch (error) {
    yield put({ type: 'AUTHORIZATION_FAIL', payload: error.message, error: true });
  }
}

export default function* () {
  yield takeLatest('LOG_IN', logInSaga);
}
