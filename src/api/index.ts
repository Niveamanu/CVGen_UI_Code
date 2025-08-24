/**
 * @fileOverview This module exports a default instance of the `ApiClient` class, which is a client for interacting with a REST API.
 *
 * @author Fahis <muhammadfahis.shareef@agilisium.com>
 * @copyright Agilisium 2021
 * @license MIT
 */

import API_DOMAIN from "./apiDomain";
import ApiClient from "./client";

/**
 * A default instance of the `ApiClient` class, configured with the API domain specified in the `API_DOMAIN` module.
 * If `API_DOMAIN` is not defined or is an empty string, the client will not have a base URL and all requests will need to include the full URL.
 *
 * @type {ApiClient}
 */
const api = new ApiClient(API_DOMAIN || "");

export default api;
