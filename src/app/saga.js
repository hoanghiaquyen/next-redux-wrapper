import { cartSagas } from "modules/cart/cartSaga";
import { shopSagas } from "modules/shop/shopSaga";
import { userSagas } from "modules/user/userSaga";
import { all } from "redux-saga/effects";

const rootSaga = function* () {
  yield all([shopSagas(), userSagas(), cartSagas()]);
};

export default rootSaga;
