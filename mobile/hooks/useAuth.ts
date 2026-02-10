import { useAuth0, WebAuthError, WebAuthErrorCodes } from "react-native-auth0";
import { config } from "../config";

export function useAuth() {
  const { authorize, clearSession, user, isLoading, getCredentials } =
    useAuth0();

  const login = async (): Promise<boolean> => {
    try {
      await authorize({
        audience: config.auth0.audience,
        scope: "openid profile email offline_access",
      });
      return true;
    } catch (error) {
      if (
        error instanceof WebAuthError &&
        error.type === WebAuthErrorCodes.USER_CANCELLED
      ) {
        return false;
      }
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (): Promise<boolean> => {
    try {
      await authorize({
        audience: config.auth0.audience,
        scope: "openid profile email offline_access",
        additionalParameters: { screen_hint: "signup" },
      });
      return true;
    } catch (error) {
      if (
        error instanceof WebAuthError &&
        error.type === WebAuthErrorCodes.USER_CANCELLED
      ) {
        return false;
      }
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await clearSession();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getAccessToken = async (): Promise<string | null> => {
    try {
      const credentials = await getCredentials();
      return credentials?.accessToken ?? null;
    } catch (error) {
      console.error("Failed to get token:", error);
      return null;
    }
  };

  return { login, signup, logout, user, isLoading, getAccessToken };
}
