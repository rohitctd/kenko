import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import sagas from "../saga/RootSaga";
import rootReducer from "../reducers/RootReducers";

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true
});

const enhancers =
  process.env.NODE_ENV !== "production" && window.devToolsExtension
    ? [window.devToolsExtension()]
    : [];

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = compose(
    applyMiddleware(sagaMiddleware, logger),
    ...enhancers
  )(createStore)(rootReducer);

  sagaMiddleware.run(sagas);

  return store;
}
