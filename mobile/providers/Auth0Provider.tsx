import { config } from "@/config";
import { Auth0Provider } from "react-native-auth0";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={config.auth0.domain}
      clientId={config.auth0.clientId}
    >
      {children}
    </Auth0Provider>
  );
}
