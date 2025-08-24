// <reference types="webpack-env" />

/**
 * A module that configures the redux store for the Development app.
 *
 * @module configureStore
 * @param {Object} applyMiddleware - The redux `applyMiddleware` function.
 * @param {Object} createStore - The redux `createStore` function.
 * @param {Object} persistReducer - The `persistReducer` function from `redux-persist`.
 * @param {Object} persistStore - The `persistStore` function from `redux-persist`.
 * @param {Object} storage - The `storage` object from `redux-persist`.
 * @param {Object} thunk - The `thunk` middleware.
 * @param {Object} rootReducer - The root reducer for the app.
 * @param {Object} initialize - A function that initializes the store.
 * @param {Object} loadingBarMiddleware - The `loadingBarMiddleware` function from `react-redux-loading-bar`.
 */
import { loadingBarMiddleware } from "react-redux-loading-bar";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import initialize from "./initializeStore";
import rootReducer from "./rootReducer";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "authUser",
    "uiData",
    "navigateReducer",
    "templateDetails",
    "patientDetails",
  ],
};

/**
 * Configures the redux store for the app.
 *
 * @function
 * @returns {Object} An object containing the store and persistor.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(
    persistedReducer,

    composeWithDevTools(applyMiddleware(thunk as any, loadingBarMiddleware()))
  );

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./rootReducer', () => {
  //     store.replaceReducer(rootReducer)
  //   })
  // }

  const persistor = persistStore(store, null, () => {
    initialize(store);
  });
  return { store, persistor };
};

export default configureStore;
