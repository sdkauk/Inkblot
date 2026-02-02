// app/index.tsx
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const { user, isLoading, getAccessToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        const token = await getAccessToken();
        setIsAuthenticated(!!token);
      }
      setChecking(false);
    };
    checkAuth();
  }, [user]);

  if (isLoading || checking) {
    return null;
  }

  if (!user && !isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/journal" />;
}
