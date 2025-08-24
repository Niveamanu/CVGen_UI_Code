import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import App from '@/App'

import { BrowserRouter } from 'react-router-dom'

/**
 * The root component of the application.
 *
 * @param {Object} store - The redux store.
 * @param {Object} persistor - The persisted redux store.
 */
const Root = ({ store, persistor }: { store: any; persistor: any }) => {
  /**
   * Provider for the redux store.
   *
   * @param {Object} store - The redux store.
   */
  return (
    <Provider store={store}>
      {/**
       * BrowserRouter for routing.
       */}
      {/* <BrowserRouter> */}
        {/**
         * PersistGate for managing the persisted redux store.
         *
         * @param {null} loading - We don't want to inject loading, since we are using lazy components.
         * @param {Object} persistor - The persisted redux store.
         *
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={null} persistor={persistor}>
          {/**
           * The entry point of the application.
           */}
          <App />
        </PersistGate>
      {/* </BrowserRouter> */}
    </Provider>
  )
}

Root.propTypes = {
  /**
   * The redux store.
   */
  store: PropTypes.shape({}).isRequired,
  /**
   * The persisted redux store.
   */
  persistor: PropTypes.shape({}).isRequired,
}

export default Root
