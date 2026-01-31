import { useAuth0 } from "react-native-auth0";
import { config } from "../config";

export function useAuth() {
  const { authorize, clearSession, user, isLoading, getCredentials } =
    useAuth0();

  const login = async () => {
    try {
      await authorize({
        audience: config.auth0.audience,
        scope: "openid profile email offline_access",
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await clearSession();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getAccessToken = async () => {
    try {
      const credentials = await getCredentials();
      return credentials?.accessToken;
    } catch (error) {
      console.error("Failed to get token:", error);
      return null;
    }
  };

  return { login, logout, user, isLoading, getAccessToken };
}
