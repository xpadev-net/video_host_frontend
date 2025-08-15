"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AuthForm, AuthLayout, FormField } from "@/components/Auth";
import { SiteName } from "@/contexts/env";
import { useAuth } from "@/hooks/useAuth";
import { requests } from "@/libraries/requests";
import { postAuth } from "@/service/postAuth";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, error, startAuth, handleAuthSuccess, handleAuthError } =
    useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Set page title
    document.title = `ログイン - ${SiteName}`;

    void (async () => {
      // Check if already authenticated
      const token = localStorage.getItem("token");
      if (token && token !== "null" && token.trim() !== "") {
        requests.defaults.headers.Authorization = `Bearer ${token}`;
        const callback = searchParams?.get("callback");
        router.push(callback ? decodeURIComponent(callback) : "/");
        return;
      }
      setInitialLoading(false);
    })();
  }, [router, searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    startAuth();

    const tokenResponse = await postAuth(username, password);
    if (tokenResponse.data.status === "ok") {
      handleAuthSuccess(tokenResponse.data.data);
    } else {
      handleAuthError(tokenResponse.data.message || "ログインに失敗しました");
    }
  };

  if (initialLoading) {
    return (
      <AuthLayout title="ログイン" description="読み込み中...">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="ログイン" description="アカウントにログインしてください">
      <AuthForm
        onSubmit={handleSignIn}
        submitText="ログイン"
        submitTextLoading="ログイン中..."
        isLoading={loading}
        isDisabled={loading || !username || !password}
        linkText="アカウントをお持ちでない方は"
        linkHref="/register"
        linkLabel="新規登録"
        error={error}
      >
        <FormField
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={setUsername}
          disabled={loading}
          required
        />
        <FormField
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={setPassword}
          disabled={loading}
          required
        />
      </AuthForm>
    </AuthLayout>
  );
};

export default LoginPage;
