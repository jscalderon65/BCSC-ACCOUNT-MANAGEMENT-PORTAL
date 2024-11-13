import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND_URL: "http://localhost:8000/account_management",
    IS_PROD_ENVIRONMENT: "false",
    CLIENT_TOKEN_STORAGE_NAME: "portalProfileToken",
    INDEX_APP_ROUTE: "/",
    LOGIN_ROUTE: "/login",
    PUBLIC_KEY: `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAubBLWt7irtB32XPgtkVW
    WwBxwltnokURmLyepeqKxfGgBlmx+Sb/rE52Yq5PouIQ3tyfTEKrMeRvYS54znMs
    AiWCK22k9Fil3MropDidJC6kayPF6EB6PpDwzOPL7AMqjPlsPS92HPmFdqT12/M9
    MczhY1LBHqP26ihXIyGxbdskm+MZvOwcKggSCOigm7m5BntlZTaXmCttYgxlKXUm
    OPGjfJoFUrbkqa8yarA0paHumij1NuxKgE3DDDMeVyZY2bV7giDH22BytEP93d/v
    mm7LMXAoy7I1+0OgwWNainYVlq2QIXvGWl0+a4PbdAsoKgMtzKcCkVBpdxcAvRUQ
    3wIDAQAB
    -----END PUBLIC KEY-----`,
  },
};

export default nextConfig;
