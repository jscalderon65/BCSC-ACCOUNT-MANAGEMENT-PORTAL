import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND_URL: "http://localhost:8000/account_management",
    IS_PROD_ENVIRONMENT: "false",
    CLIENT_TOKEN_STORAGE_NAME: "portalProfileId",
    REDIRECT_AUTH_MIDDLEWARE_ROUTE: "/",
    LOGIN_ROUTE: "/login",
  },
};

export default nextConfig;
