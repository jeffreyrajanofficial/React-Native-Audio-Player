import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../js/reducers";

const storeConfig = createStore(
  reducers,
  compose(applyMiddleware(thunk))
);

export default storeConfig;
