import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(
  rootReducer,
  // Enable redux devtools
  // See https://github.com/zalmoxisus/redux-devtools-extension#usage
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
