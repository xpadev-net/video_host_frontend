import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { request } from "@/libraries/request";
import { authResponse, tryAuthResponse } from "@/@types/api";
import Styles from "@/styles/login.module.scss";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    void (async () => {
      if (router.pathname !== "/login") return;
      const res = await request<tryAuthResponse>(`/tryAuth/`);
      if (res.status === "success") {
        void router.push(
          router.query.callback ? `${router.query.callback}` : "/"
        );
        return;
      }
      setLoading(false);
    })();
  }, [router]);

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    void (async () => {
      const data = new FormData();
      data.append("username", username);
      data.append("password", password);
      const res = await request<authResponse>(`/auth/`, {
        method: "POST",
        body: data,
      });
      if (res.status === "fail") {
        setMessage("incorrect username or password");
        setLoading(false);
        return;
      }
      void router.push(
        router.query.callback ? `${router.query.callback}` : "/"
      );
    })();
  };

  return (
    <>
      {loading && <div className={Styles.loading} />}
      <div className={Styles.wrapper}>
        {message && <div>{message}</div>}
        <form className={Styles.form}>
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
