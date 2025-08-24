import api from "@/api";
import {
  csrfInterceptor,
  unauthorizedApiResponseInterceptor,
} from "@/api/interceptor";
import { AuthService } from "@/api/services";
import { logoutAction } from "./reducers/authUser";
import { clearDataAction } from "./reducers/common";
import { toast } from "react-toastify";

/**
 * Initializes the application's integration with an HTTP API.
 *
 * @param {Object} store - The Redux store instance.
 */
const initialize = (store: any) => {
  const state = store.getState();
  // csrfInterceptor()
  unauthorizedApiResponseInterceptor(
    (message: string) => {
      store.dispatch(logoutAction());
      store.dispatch(clearDataAction());
      api.setToken(undefined);
      window.location.href = `auth?token=${message}`;
    },
    [AuthService.loginUrl]
  );

  api.setToken(state.authUser.token);

  if (state.authUser.token) {
    api.setToken(state.authUser.token);
  }
};

export default initialize;
