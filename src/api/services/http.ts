import axios from "axios";
import { saveAs } from "file-saver";

// axios.defaults.withCredentials = true
/**
 * Returns an object with an `Authorization` property,
 * whose value is a JWT constructed using the provided token.
 *
 * @param {string} token - The token to use in the JWT.
 * @returns {Object} An object with an `Authorization` property.
 */
export function getAuthHeader(token: string) {
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Makes a GET request to the specified URL,
 * using the `store` object's `token` property as the `Authorization` header.
 *
 * @param {string} url - The URL to send the request to.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function get(url: string, store: { token?: string }) {
  const options = {
    headers: {
      ...getAuthHeader(store?.token!),
    },
  };
  return axios.get(url, options);
}

/**
 * Makes a POST request to the specified URL,
 * using the provided data as the request body
 * and the `store` object's `token` property as the `Authorization` header.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @param {Object} store - An object with a `token` property.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function post(url: string, data: any, store: { token?: string }) {
  const options = {
    data,
    url,
    method: "POST",
    headers: {
      ...getAuthHeader(store?.token!),
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, JSON.stringify(data), options);
}

/**
 * Makes a file upload POST request to the specified URL,
 * using FormData for multipart/form-data uploads.
 *
 * @param {string} url - The URL to send the request to.
 * @param {File} file - The file to upload.
 * @param {Object} store - An object with a `token` property.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function uploadFile(url: string, file: File, store: { token?: string }) {
  const formData = new FormData();
  formData.append('file', file);
  
  const options = {
    headers: {
      ...getAuthHeader(store?.token!),
      // Don't set Content-Type for FormData, let browser set it with boundary
    },
  };
  
  return axios.post(url, formData, options);
}

/**
 * Makes a PUT request to the specified URL,
 * using the provided data as the request body
 * and the `store` object's `token` property as the `Authorization` header.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @param {Object} store - An object with a `token` property.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function put(url: string, data: any, store: { token?: string }) {
  const options = {
    data,
    url,
    method: "PUT",
    headers: {
      ...getAuthHeader(store?.token!),
      "Content-Type": "application/json",
    },
  };
  return axios.put(url, JSON.stringify(data), options);
}

/**
 * Downloads data from the specified URL using a GET request.
 * @param {string} url - The URL to send the request to.
 * @param {Object} store - An object containing the user's token.
 * @param {string} accept - Is Optional Param, The expected MIME type of the response.
 * @return {Promise} - A promise that resolves with the response data.
 */
export async function downloadGetData(
  url: string,
  store: { token?: string },
  accept: string
) {
  const options = {
    headers: {
      ...getAuthHeader(store?.token!),
      Accept: accept,
    },
    responseType: "arraybuffer" as const,
  };
  return axios.get(url, options);
}

/**
 * Downloads data from the specified URL using a POST request.
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @param {Object} store - An object containing the user's token.
 * @param {Object} accept - Is Optional Param, The expected MIME type of the response.
 * @return {Promise} - A promise that resolves with the response data.
 */
export async function downloadPostData(
  url: string,
  data: any,
  store: { token?: string },
  accept: string
) {
  const options = {
    headers: {
      ...getAuthHeader(store?.token!),
      Accept: accept,
    },
    responseType: "arraybuffer" as const,
  };
  return axios.post(url, data, options);
}

/**
 * Saves the provided data as a file with the specified file name and type.
 * @param {ArrayBuffer} buffer - The data to save as a file.
 * @param {string} type - The MIME type of the file.
 * @param {string} fileName - The name of the file.
 */
export const saveDownloadedFile = (
  buffer: ArrayBuffer,
  type: string,
  fileName: string
) => {
  const data = new Blob([buffer], { type });
  saveAs(data, fileName);
};
