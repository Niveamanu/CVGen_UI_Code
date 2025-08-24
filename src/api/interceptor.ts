import axios, { AxiosError, AxiosResponse } from "axios";
import API_DOMAIN from "./apiDomain";

// Define types for error response structure
interface ErrorResponse {
  status: number;
  data: {
    message?: string;
  };
  headers: Record<string, string>;
  config: {
    url: string;
  };
}

/**
 * This interceptor checks for the x-csrf-token in the response header
 * If it is present, it sets the axios common header for the next request
 *
 * If an error is thrown with a status of 405, it will attempt to set the
 * x-csrf-token in the error config and retry the request.
 *
 * @returns {void}
 */
export const csrfInterceptor = (): void => {
  let retryCount = 0;
  axios.interceptors.response.use(
    function (response: AxiosResponse) {
      retryCount = 0;
      const newCsrfToken = response.headers["x-csrf-token"];
      if (newCsrfToken) {
        axios.defaults.headers.common["X-CSRF-TOKEN"] = newCsrfToken;
      }
      return response;
    },
    function (error: AxiosError) {
      if (error.response?.status === 405 && retryCount < 6) {
        retryCount++;
        const newCsrfToken = error.response.headers["x-csrf-token"];
        if (newCsrfToken && error.config) {
          error.config.headers = error.config.headers || {};
          error.config.headers["X-CSRF-TOKEN"] = newCsrfToken;
          return axios(error.config);
        } else {
          console.log("no Token");
        }
      }
      retryCount = 0;
      return Promise.reject(error);
    }
  );
};

/**
 * Add an interceptor to axios that handles unauthorized responses.
 * @param {function} onUnauthorizedResponse - A function to be called when an unauthorized response is received.
 * @param {string[]} excludedEndpoints - An optional array of endpoints that should be excluded from handling by the interceptor.
 *
 * @throws {Error} When the response status is 403 and 401
 */
export const unauthorizedApiResponseInterceptor = (
  onUnauthorizedResponse: ((message: string) => void) | undefined,
  excludedEndpoints?: string[]
) => {
  axios.interceptors.response.use(undefined, (err: AxiosError) => {
    try {
      if (err.response && err.response.status === 401) {
        if (!excludeOn(err, excludedEndpoints) && onUnauthorizedResponse) {
          const message =
            (err.response.data as any)?.message ?? "Token Expired!";
          onUnauthorizedResponse(message);
        }
        throw new Error(`Unauthorized response`);
      }
      if (err.response && err.response.status === 403) {
        throw new Error(`Forbidden Access Denied`);
      }
    } catch (error) {
      console.log(error);
      // throw error
    }
  });
};

/**
 * Check if an endpoint (specified as a path) should be exempt from handling by the unauthorized response interceptor.
 * @param {object} err - The error object containing the response.
 * @param {string[]} exemptPaths - An array of endpoints (specified as paths) that should be exempt from handling by the interceptor.
 * @returns {boolean} Whether the endpoint should be exempt.
 */
export const excludeOn = (err: AxiosError, exemptPaths?: string[]): boolean => {
  if (!exemptPaths?.length) {
    return false;
  }
  try {
    if (!err.response?.config?.url) {
      return false;
    }
    const url = new URL(
      err.response.config.url.replace(API_DOMAIN, ""),
      API_DOMAIN
    );
    return exemptPaths.includes(url.pathname);
  } catch (error) {
    // handle error
    return false;
  }
};

export default { unauthorizedApiResponseInterceptor, csrfInterceptor };
