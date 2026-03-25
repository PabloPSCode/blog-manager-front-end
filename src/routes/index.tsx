import { useAuthenticationStore } from "@/store/auth";
import { authService } from "@/services/auth.service";
import { useEffect } from "react";
import AppRouter from "./app.routes";
import AuthRouter from "./auth.routes";

export default function Routes() {
  const {
    hasHydrated,
    isAuthenticated,
    isLoadingSession,
    jwt,
    setSessionLoading,
    setSite,
    signOut,
  } = useAuthenticationStore();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!jwt) {
      setSessionLoading(false);
      return;
    }

    let isMounted = true;
    setSessionLoading(true);

    const syncAuthenticatedSite = async () => {
      try {
        const authenticatedSite = await authService.getMe(jwt);

        if (!isMounted) {
          return;
        }

        setSite(authenticatedSite);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        signOut();
      } finally {
        if (isMounted) {
          setSessionLoading(false);
        }
      }
    };

    void syncAuthenticatedSite();

    return () => {
      isMounted = false;
    };
  }, [hasHydrated, jwt, setSessionLoading, setSite, signOut]);

  if (!hasHydrated || isLoadingSession) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 text-sm text-gray-700 dark:bg-slate-800 dark:text-gray-100">
        Carregando sessao...
      </div>
    );
  }

  if (isAuthenticated) {
    return <AppRouter />;
  } else {
    return <AuthRouter />;
  }
}
