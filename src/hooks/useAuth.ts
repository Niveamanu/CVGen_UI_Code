import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StatusCodes } from "http-status-codes";
import {
  loggedInAction,
  redirectApplyAction,
  redirectSaveAction,
} from "../store/reducers/authUser";
import { toast } from "react-toastify";

// Define types for the auth service
interface AuthService {
  azureAdlogin: (params: { accesToken: string }) => Promise<{
    status: number;
    data: {
      user?: any;
      token: string;
    };
    message?: string;
  }>;
}

// Define types for the auth state
interface AuthState {
  token?: string;
}

// Define the root state type
interface RootState {
  authUser: AuthState;
}

export const useAuth = (authService: AuthService) => {
  const authState = useSelector((state: RootState) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const azureAdLogin = async (
    azureToken: string,
    setToken: (token: string) => Promise<void> | void,
    redirectTo: string,
    onSuccess?: () => void,
    onFailed?: (error: any) => void
  ) => {
    try {
      const response = await authService.azureAdlogin({
        accesToken: azureToken,
      });
      if (response.status === StatusCodes.OK) {
        if (response.data.user) {
          dispatch(
            loggedInAction({ ...response.data, token: response.data.token })
          );
          await setToken(response.data.token);
          redirectApply();
          navigate(redirectTo);
          if (onSuccess) onSuccess();
          toast.success("Logged In");
        } else {
          navigate("/");
          toast.error(
            response.message
              ? response.message
              : "You dont have acess to application"
          );
        }
      } else {
        navigate("/");
        toast.error(
          response.message
            ? response.message
            : "You dont have acess to application"
        );
      }
    } catch (error: any) {
      toast.error(error.message ? error.message : "Some Error Occur!");
      onFailed?.(error);
    }
  };
  const redirectSave = (to: string) => {
    dispatch(redirectSaveAction(to));
  };

  const redirectApply = () => dispatch(redirectApplyAction());
  return {
    isAuthenticated: !!authState.token,
    azureAdLogin,
    redirectSave,
    redirectApply,
  };
};
