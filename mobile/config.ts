export const config = {
  auth0: {
    domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN!,
    clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!,
    audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE!,
  },

  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL!,
  },
};
