import { all, call, cancel, put, takeLatest } from "redux-saga/effects";
import { getProductList, getUserCart } from "utils/api";
import {
  GET_USER_CART_FAILURE,
  GET_USER_CART_REQUEST,
  GET_USER_CART_SUCCESS,
  GET_USER_CART_TRIGGER,
} from "./cartConstants";

const getUserCartSaga = function* () {
  yield put({ type: GET_USER_CART_REQUEST });
  try {
    const [result1, result2] = yield all([
      call(getProductList),
      call(getUserCart),
    ]);
    const isOk = result1?.isOk && result2?.isOk;
    const error = result2?.error || result1?.error;

    if (isOk) {
      const productList = result1?.result.reduce(
        (result, { id, ...rest }) => ({ ...result, [id]: rest }),
        {}
      );
      const userCart = result2?.result;
      yield put({ type: GET_USER_CART_SUCCESS, productList, userCart });
    } else {
      yield put({ type: GET_USER_CART_FAILURE, error });
      yield cancel();
    }
  } catch (error) {
    yield put({ type: GET_USER_CART_FAILURE, error });
  }
};

export const cartSagas = function* () {
  yield all([takeLatest(GET_USER_CART_TRIGGER, getUserCartSaga)]);
};
