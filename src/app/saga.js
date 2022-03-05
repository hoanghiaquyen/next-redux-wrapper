import { shopSagas } from "modules/shop";
import { all } from "redux-saga/effects";

const rootSaga = function* () {
  yield all([shopSagas()]);
};

export default rootSaga;
