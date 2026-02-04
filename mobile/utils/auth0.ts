// utils/auth0.ts
import Auth0 from "react-native-auth0";
import { config } from "../config";

export const auth0 = new Auth0({
  domain: config.auth0.domain,
  clientId: config.auth0.clientId,
});
