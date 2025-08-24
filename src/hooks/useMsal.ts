import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { useCallback } from "react";

export const useMsalAuth = () => {
  const { instance, accounts, inProgress } = useMsal();

  const login = useCallback(async () => {
    try {
      // Use popup for better user experience
      await instance.loginPopup({
        scopes: ["User.Read", "User.ReadBasic.All", "profile", "openid", "email"]
      });
    } catch (error) {
      console.error("MSAL login failed:", error);
      throw error;
    }
  }, [instance]);

  const logout = useCallback(async () => {
    try {
      await instance.logoutPopup({
        postLogoutRedirectUri: window.location.origin + "/login"
      });
    } catch (error) {
      console.error("MSAL logout failed:", error);
      throw error;
    }
  }, [instance]);

  const getAccessToken = useCallback(async () => {
    try {
      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const request = {
        scopes: ["User.Read", "User.ReadBasic.All", "profile", "openid", "email"],
        account: accounts[0]
      };

      const response = await instance.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      console.error("Failed to acquire token silently:", error);
      
      // Try interactive token acquisition
      try {
        const request = {
          scopes: ["User.Read", "User.ReadBasic.All", "profile", "openid", "email"],
          account: accounts[0]
        };
        const response = await instance.acquireTokenPopup(request);
        return response.accessToken;
      } catch (popupError) {
        console.error("Failed to acquire token interactively:", popupError);
        throw popupError;
      }
    }
  }, [instance, accounts]);

  const isAuthenticated = accounts.length > 0;
  const isLoading = inProgress !== InteractionStatus.None;
  const currentAccount = accounts[0] || null;

  return {
    login,
    logout,
    getAccessToken,
    isAuthenticated,
    isLoading,
    currentAccount,
    accounts
  };
};
