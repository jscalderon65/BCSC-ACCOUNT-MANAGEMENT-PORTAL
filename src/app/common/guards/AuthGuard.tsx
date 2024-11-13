"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocalStorage } from "@hooks/localStorage";
import LoadingAnimation from "@components/LoadingAnimation";
import { CLIENT_TOKEN_STORAGE_NAME } from "@/app/common/constants/appConfig";
import { currentPortalProfile } from "@/app/services/portalProfile";
import {
  showGeneralErrorAlert,
  showUnauthorizedAlert,
} from "@/app/common/notifications/AppNotifications";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const redirectRoute = process.env.REDIRECT_AUTH_MIDDLEWARE_ROUTE || "/";
  const pagesWithAuthGuard = ["/portal"];
  const clientTokenStorageName = CLIENT_TOKEN_STORAGE_NAME;

  const [clientTokenStorage] = useLocalStorage(clientTokenStorageName, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const verifyToken = async () => {
      const requiresAuth = pagesWithAuthGuard.includes(pathName);
      if (requiresAuth && !clientTokenStorage) {
        router.push(redirectRoute);
        showUnauthorizedAlert();
        return;
      }
      try {
        await currentPortalProfile();
      } catch (error) {
        showGeneralErrorAlert();
        localStorage.removeItem(CLIENT_TOKEN_STORAGE_NAME);
        router.push(redirectRoute);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [pathName, clientTokenStorage, router]);

  if (loading) {
    return <LoadingAnimation />;
  }
  return children;
};

export default AuthGuard;
