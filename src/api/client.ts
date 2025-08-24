import { AuthService, CommonService, CVService } from "./services";

/**
 * FlourishApiClient is a class for interacting with the Flourish API.
 * It provides methods for managing Api Services
 */
export default class FlourishApiClient {
  public auth: AuthService;
  public Common: CommonService;
  public cv: CVService;
  /**
   * An object containing the API domain and the currently set token.
   *
   * @type {Object}
   */
  store: {
    apiDomain: string;
    token?: string;
  } = {
    apiDomain: "",
    token: undefined,
  };

  /**
   * Creates a new instance of FlourishApiClient.
   *
   * @param {string} apiDomain - The base URL of the Flourish API.
   */
  constructor(apiDomain: string) {
    this.store.apiDomain = apiDomain;
    this.auth = new AuthService(this.store);
    this.Common = new CommonService(this.store);
    this.cv = new CVService(this.store);
  }

  /**
   * Sets the token for authenticating API requests.
   *
   * @param {string} token - The API token to set.
   */
  setToken(token: string | undefined) {
    this.store.token = token;
  }
}
