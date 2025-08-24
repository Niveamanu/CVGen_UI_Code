import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";

import { authUserReducer } from "./reducers/authUser";
import { navigateReducer } from "./reducers/navigate";

/**
 * Root reducer for the application.
 *
 * @param {Object} state - The current state of the store.
 * @param {Object} action - The action being dispatched.
 *
 * @returns {Object} The new state of the store.
 */
const rootReducer = combineReducers({
  authUser: authUserReducer,
  loadingBar: loadingBarReducer,
  navigateReducer: navigateReducer,
});

export default rootReducer;
