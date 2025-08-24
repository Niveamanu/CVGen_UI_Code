/**
 * A module that configures the redux store for the Testing app.
 *
 * @module configureStore
 * @param {Object} applyMiddleware - The redux `applyMiddleware` function.
 * @param {Object} compose - The redux `compose` function.
 * @param {Object} createStore - The redux `createStore` function.
 * @param {Object} rootReducer - The root reducer for the app.
 * @param {Object} thunk - The `thunk` middleware.
 * @param {Object} loadingBarMiddleware - The `loadingBarMiddleware` function from `react-redux-loading-bar`.
 */
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

/**
 * Configures the redux store for the app.
 *
 * @function
 * @param {Object} [preloadedState] - The initial state for the store.
 * @returns {Object} The store.
 */
const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(thunk, loadingBarMiddleware()))
  )
  return store
}

export default configureStore
