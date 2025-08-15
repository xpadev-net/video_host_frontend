"use client";

import { useEffect, useState } from "react";

import { AuthForm, AuthLayout, FormField } from "@/components/Auth";
import { RequireSignupCode, SiteName } from "@/contexts/env";
import { useAuth } from "@/hooks/useAuth";
import { postUsers } from "@/service/postUsers";
import {
  validatePassword,
  validatePasswordMatch,
} from "@/utils/authValidation";

const RegisterPage = () => {
  const { loading, error, startAuth, handleAuthSuccess, handleAuthError } =
    useAuth();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");

  useEffect(() => {
    // Set page title
    document.title = `新規登録 - ${SiteName}`;
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    startAuth();

    // バリデーション
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      handleAuthError(passwordValidation.error);
      return;
    }

    const passwordMatchValidation = validatePasswordMatch(
      password,
      confirmPassword,
    );
    if (!passwordMatchValidation.isValid) {
      handleAuthError(passwordMatchValidation.error);
      return;
    }

    const response = await postUsers(
      username,
      name,
      password,
      RequireSignupCode ? signupCode : "",
    );
    if (response.data.status === "ok") {
      handleAuthSuccess(response.data.data.token);
    } else {
      handleAuthError(response.data.message || "登録に失敗しました");
    }
  };

  const isFormValid =
    username &&
    name &&
    password &&
    confirmPassword &&
    (!RequireSignupCode || signupCode);

  return (
    <AuthLayout
      title="新規登録"
      description="新しいアカウントを作成してください"
    >
      <AuthForm
        onSubmit={handleRegister}
        submitText="新規登録"
        submitTextLoading="登録中..."
        isLoading={loading}
        isDisabled={loading || !isFormValid}
        linkText="すでにアカウントをお持ちですか？"
        linkHref="/login"
        linkLabel="ログイン"
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
          type="text"
          placeholder="表示名"
          value={name}
          onChange={setName}
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
        <FormField
          type="password"
          placeholder="パスワード確認"
          value={confirmPassword}
          onChange={setConfirmPassword}
          disabled={loading}
          required
        />
        {RequireSignupCode && (
          <FormField
            type="text"
            placeholder="登録コード"
            value={signupCode}
            onChange={setSignupCode}
            disabled={loading}
            required
          />
        )}
      </AuthForm>
    </AuthLayout>
  );
};

export default RegisterPage;
