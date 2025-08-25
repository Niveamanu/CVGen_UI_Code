import {
  Configuration,
  PopupRequest,
  PublicClientApplication,
} from "@azure/msal-browser";

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    // clientId:
    // import.meta.env.VITE_AZURE_AD_CLIENT_ID ||
    // "b7fb9a3b-efe3-418d-8fa8-243487a42530",
    clientId:
      import.meta.env.VITE_AZURE_AD_CLIENT_ID ||
      "50dd421a-4297-43fc-85df-8edee3b266a7",
    // authority: `https://login.microsoftonline.com/${
    //   import.meta.env.VITE_AZURE_AD_TENANT_ID ||
    //   "b8869792-ee44-4a05-a4fb-b6323a34ca35"
    // }`,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_AZURE_AD_TENANT_ID ||
      "3b039a3e-0b01-4b1c-955e-1ddc0c11a314"
    }`,
    redirectUri: `${window.location.origin}/`,
    postLogoutRedirectUri: `${window.location.origin}/login`,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0:
            console.error(message);
            return;
          case 1:
            console.warn(message);
            return;
          case 2:
            console.info(message);
            return;
          case 3:
            console.debug(message);
            return;
          default:
            console.log(message);
            return;
        }
      },
    },
  },
};

// Add scopes here
export const loginRequest: PopupRequest = {
  scopes: ["User.Read", "User.ReadBasic.All", "profile", "openid", "email"],
};

// Add the endpoints here
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

// Create MSAL instance using singleton pattern
let msalInstanceInternal: PublicClientApplication | null = null;

export const getMsalInstance = (): PublicClientApplication => {
  if (!msalInstanceInternal) {
    // Check if MSAL is already initialized in the window
    const existingInstance = (window as any).msalInstance;
    if (
      existingInstance &&
      existingInstance instanceof PublicClientApplication
    ) {
      console.log("MSAL: Reusing existing instance from window");
      msalInstanceInternal = existingInstance;
      return msalInstanceInternal;
    }

    console.log("MSAL: Creating new instance");
    msalInstanceInternal = new PublicClientApplication(msalConfig);

    // Store the instance in window to prevent multiple initializations
    (window as any).msalInstance = msalInstanceInternal;

    // Initialize the MSAL instance
    msalInstanceInternal.initialize().catch((error) => {
      console.error("MSAL initialization failed:", error);
    });
  } else {
    console.log("MSAL: Returning existing instance");
  }
  return msalInstanceInternal;
};

// Export the instance for backward compatibility
export const msalInstance = getMsalInstance();
