"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocalStorage } from "@hooks/localStorage";
import lottie from "lottie-web";
import LoadingAnimation from "@components/LoadingAnimation";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lottie/loading.json",
      });
      lottie.setSpeed(4);
    }
  }, []);

  const router = useRouter();
  const pathName = usePathname();
  const redirectRoute = "/";
  const pagesWithAuthGuard = ["/home"];
  const clientTokenStorageName = "portalProfileId";
  const [clientTokenStorage] = useLocalStorage(clientTokenStorageName, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requiresAuth = pagesWithAuthGuard.includes(pathName);

    if (requiresAuth && !clientTokenStorage) {
      router.push(redirectRoute);
    } else {
      setLoading(false);
    }
  }, [pathName, clientTokenStorage, router]);

  if (loading) {
    return <LoadingAnimation />;
  }
};

export default AuthGuard;
