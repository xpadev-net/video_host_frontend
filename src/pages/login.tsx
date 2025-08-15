import { useSetAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { AuthTokenAtom } from "@/atoms/Auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SiteName } from "@/contexts/env";
import { requests } from "@/libraries/requests";
import { postAuth } from "@/service/postAuth";

const Login = () => {
  const router = useRouter();
  const setAuthToken = useSetAtom(AuthTokenAtom);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    void (async () => {
      if (router.pathname !== "/login") return;
      // Check if already authenticated
      const token = localStorage.getItem("token");
      if (token && token !== "null" && token.trim() !== "") {
        requests.defaults.headers.Authorization = `Bearer ${token}`;
        void router.push(
          typeof router.query.callback === "string"
            ? `${decodeURIComponent(router.query.callback)}`
            : "/",
        );
        return;
      }
      setLoading(false);
    })();
  }, [router.pathname, router.push, router.query.callback]);

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    setError("");

    const tokenResponse = await postAuth(username, password);
    if (tokenResponse.data.status === "ok") {
      requests.defaults.headers.Authorization = `Bearer ${tokenResponse.data.data}`;
      setAuthToken(tokenResponse.data.data);
      await router.push(
        typeof router.query.callback === "string"
          ? `${decodeURIComponent(router.query.callback)}`
          : "/",
      );
    } else {
      setError(tokenResponse.data.message || "ログインに失敗しました");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`ログイン - ${SiteName}`}</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              ログイン
            </CardTitle>
            <CardDescription className="text-center">
              アカウントにログインしてください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {error}
              </div>
            )}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="ユーザー名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !username || !password}
              >
                {loading ? "ログイン中..." : "ログイン"}
              </Button>
            </form>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                アカウントをお持ちでない方は{" "}
              </span>
              <Link href="/register" className="text-primary hover:underline">
                新規登録
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default Login;
