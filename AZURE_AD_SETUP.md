# Azure AD Authentication Setup Guide

## Prerequisites
- Azure Active Directory tenant
- Registered application in Azure AD
- Proper redirect URIs configured

## Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Azure Active Directory Configuration
VITE_AZURE_AD_TENANT_ID=your_tenant_id_here
VITE_AZURE_AD_CLIENT_ID=your_client_id_here

# Optional: API Domain for your backend
VITE_API_DOMAIN=http://127.0.0.1:8000
```

## Azure AD App Registration Steps

1. **Go to Azure Portal** → Azure Active Directory → App registrations
2. **Create new registration** with a descriptive name
3. **Set redirect URIs**:
   - Single-page application (SPA): `http://localhost:5173` (for development)
   - Single-page application (SPA): `https://yourdomain.com` (for production)
4. **Copy the Application (client) ID** to `VITE_AZURE_AD_CLIENT_ID`
5. **Copy the Directory (tenant) ID** to `VITE_AZURE_AD_TENANT_ID`
6. **Configure API permissions**:
   - Microsoft Graph → Delegated permissions
   - Add: `User.Read`, `User.ReadBasic.All`, `profile`, `openid`, `email`
7. **Grant admin consent** for the permissions

## Current Configuration

The application is currently configured with:
- **Tenant ID**: `3b039a3e-0b01-4b1c-955e-1ddc0c11a314`
- **Client ID**: `50dd421a-4297-43fc-85df-8edee3b266a7`

## New MSAL Implementation

This application now uses the latest Microsoft Authentication Library:
- **@azure/msal-browser**: Core MSAL functionality
- **@azure/msal-react**: React integration
- **Popup Authentication**: Better user experience than redirects
- **Automatic Token Management**: Handles token refresh automatically

## Testing

1. Start your development server
2. Navigate to `/login`
3. Click the "Microsoft" button
4. A popup will open for Microsoft login
5. After successful authentication, you'll be redirected to `/dashboard`

## Troubleshooting

- **Popup blocked**: Ensure popups are allowed for your domain
- **Client ID mismatch**: Ensure the client ID in Azure AD matches exactly
- **Permissions**: Make sure admin consent is granted for the required permissions
- **CORS**: Ensure your backend allows requests from your frontend domain
- **Environment variables**: Make sure your `.env` file is properly configured

## Benefits of New Implementation

- **Modern**: Uses latest MSAL packages with full TypeScript support
- **Reliable**: No more regeneratorRuntime errors
- **User-friendly**: Popup authentication instead of full page redirects
- **Maintainable**: Clean, modern code structure
- **Secure**: Proper token management and refresh handling
