import { useRouter } from "next/router";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { request } from "@/libraries/request";
import { authResponse, tryAuthResponse } from "@/@types/api";
import Styles from "@/styles/login.module.scss";
import Head from "next/head";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    void (async () => {
      console.log("try auth start");
      if (router.pathname !== "/login") return;
      const res = await request<tryAuthResponse>(`/tryAuth/`);
      console.log("try auth end");
      if (res.status === "success") {
        void router.push(
          typeof router.query.callback === "string"
            ? `${decodeURIComponent(router.query.callback)}`
            : "/"
        );
        return;
      }
      setLoading(false);
    })();
  }, []);

  const onSubmit = (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    void (async () => {
      console.log("auth start");
      const data = new FormData();
      data.append("username", username);
      data.append("password", password);
      const res = await request<authResponse>(`/auth/`, {
        method: "POST",
        body: data,
      });
      console.log("auth end");
      if (res.status === "fail") {
        setMessage("incorrect username or password");
        setLoading(false);
        return;
      }
      console.log("redirecting");
      await router.push(
        router.query.callback ? `${router.query.callback}` : "/"
      );
    })();
  };

  return (
    <>
      <Head>
        <title>{`ログイン - ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      {loading && <div className={Styles.loading} />}
      <div className={Styles.wrapper}>
        {message && <div>{message}</div>}
        <form className={Styles.form} onSubmit={onSubmit}>
          <input
            type={"text"}
            required={true}
            name={"username"}
            className={Styles.input}
            placeholder={"Username"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type={"password"}
            required={true}
            name={"password"}
            className={Styles.input}
            placeholder={"Password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="button" className={Styles.button} onClick={onSubmit}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
