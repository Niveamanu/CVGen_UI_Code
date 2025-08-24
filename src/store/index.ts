/**.
 * @fileOverview A module that exports the store and persistor created by the `configureStore` module
 *
 * @author Fahis <muhammadfahis.shareef@agilisium.com>
 * @copyright Agilisium 2021
 * @license MIT
 *
 * @module store
 * @param {Object} configureStore - The store configuration module.
 */
import configureStore from "./configureStore";

/**
 * The store created by the `configureStore` module.
 *
 * @type {Object}
 */
const store = configureStore().store;
/**
 * The persistor created by the `configureStore` module.
 *
 * @type {Object}
 */
const persistor = configureStore().persistor;

export { store, persistor };
/**
 * An object containing the store and persistor created by the `configureStore` module.
 *
 * @type {Object}
 */
export default { store, persistor };
