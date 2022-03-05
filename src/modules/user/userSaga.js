const { put, call, all, takeLatest, cancel } = require("redux-saga/effects");
const { getUserInfor } = require("utils/api");
const {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_TRIGGER,
} = require("./userConstants");

const getUserInfoSaga = function* () {
  yield put({ type: GET_USER_REQUEST });
  try {
    const { isOk, result, error } = yield call(getUserInfor);
    if (isOk) {
      yield put({ type: GET_USER_SUCCESS, result });
    } else {
      yield put({ type: GET_USER_FAILURE, error });
      yield cancel();
    }
  } catch (error) {
    yield put({ type: GET_USER_FAILURE, error });
  }
};

export const userSagas = function* () {
  yield all([takeLatest(GET_USER_TRIGGER, getUserInfoSaga)]);
};
