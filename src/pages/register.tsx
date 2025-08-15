import { useSetAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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
import { RequireSignupCode, SiteName } from "@/contexts/env";
import { requests } from "@/libraries/requests";
import { postUsers } from "@/service/postUsers";

const Register = () => {
  const router = useRouter();
  const setAuthToken = useSetAtom(AuthTokenAtom);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    setError("");

    // バリデーション
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください");
      setLoading(false);
      return;
    }

    const response = await postUsers(
      username,
      name,
      password,
      RequireSignupCode ? signupCode : "",
    );
    if (response.data.status === "ok") {
      requests.defaults.headers.Authorization = `Bearer ${response.data.data.token}`;
      setAuthToken(response.data.data.token);
      await router.push("/");
    } else {
      setError(response.data.message || "登録に失敗しました");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`新規登録 - ${SiteName}`}</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              新規登録
            </CardTitle>
            <CardDescription className="text-center">
              新しいアカウントを作成してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {error}
              </div>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
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
                  type="text"
                  placeholder="表示名"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="パスワード確認"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              {RequireSignupCode && (
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="登録コード"
                    value={signupCode}
                    onChange={(e) => setSignupCode(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={
                  loading ||
                  !username ||
                  !name ||
                  !password ||
                  !confirmPassword ||
                  (RequireSignupCode && !signupCode)
                }
              >
                {loading ? "登録中..." : "新規登録"}
              </Button>
            </form>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                すでにアカウントをお持ちですか？{" "}
              </span>
              <Link href="/login" className="text-primary hover:underline">
                ログイン
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
