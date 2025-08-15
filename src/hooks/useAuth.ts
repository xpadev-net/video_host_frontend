import { useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { AuthTokenAtom } from "@/atoms/Auth";
import { requests } from "@/libraries/requests";

export function useAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuthToken = useSetAtom(AuthTokenAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuthSuccess = (token: string) => {
    requests.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthToken(token);
    const callback = searchParams?.get("callback");
    router.push(callback ? decodeURIComponent(callback) : "/");
  };

  const handleAuthError = (message?: string) => {
    setError(message || "認証に失敗しました");
    setLoading(false);
  };

  const startAuth = () => {
    setLoading(true);
    setError("");
  };

  return {
    loading,
    error,
    setError,
    startAuth,
    setLoading,
    handleAuthSuccess,
    handleAuthError,
  };
}
