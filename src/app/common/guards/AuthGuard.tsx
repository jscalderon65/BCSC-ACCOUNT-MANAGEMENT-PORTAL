"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocalStorage } from "@hooks/localStorage";
import LoadingAnimation from "@components/LoadingAnimation";
import { CLIENT_TOKEN_STORAGE_NAME } from "@constants/app-config";
import { currentPortalProfile } from "@/app/services/portalProfile";

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
    const requiresAuth = pagesWithAuthGuard.includes(pathName);

    if (requiresAuth && !clientTokenStorage) {
      router.push(redirectRoute);
    } else {
      currentPortalProfile(clientTokenStorage).then((data) => {
        setLoading(false);
      });
    }
  }, [pathName, clientTokenStorage, router]);

  if (loading) {
    return <LoadingAnimation />;
  }
  return children;
};

export default AuthGuard;
