import { all, call, put, takeLatest, cancel, select } from "redux-saga/effects";
import { getProductList } from "utils/api";
import {
  GET_PRODUCT_LIST_TRIGGER,
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
  SEARCH_PRODUCT_LIST_TRIGGER,
  SEARCH_PRODUCT_LIST_SUCCESS,
  SEARCH_PRODUCT_LIST_FAILURE,
} from "./shopConstants";

const searchProductSaga = function* ({ searchString }) {
  try {
    const productList = yield select((state) => state.shop.productList);
    const result = productList.filter((el) => el.title.includes(searchString));
    yield put({ type: SEARCH_PRODUCT_LIST_SUCCESS, result, searchString });
  } catch (error) {
    yield put({ type: SEARCH_PRODUCT_LIST_FAILURE, error });
  }
};

const getProductListSaga = function* ({ limit }) {
  yield put({ type: GET_PRODUCT_LIST_REQUEST });
  try {
    const { isOk, result, error } = yield call(getProductList, limit);
    if (isOk) {
      yield put({ type: GET_PRODUCT_LIST_SUCCESS, result });
    } else {
      yield put({ type: GET_PRODUCT_LIST_FAILURE, error });
      yield cancel();
    }
  } catch (error) {
    yield put({ type: GET_PRODUCT_LIST_FAILURE, error });
  }
};

export const shopSagas = function* () {
  yield all([
    takeLatest(GET_PRODUCT_LIST_TRIGGER, getProductListSaga),
    takeLatest(SEARCH_PRODUCT_LIST_TRIGGER, searchProductSaga),
  ]);
};
