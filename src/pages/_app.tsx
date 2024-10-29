import "@/styles/global.scss";
import "@/styles/nprogress.css";
import "@radix-ui/themes/styles.css";

import { useAtomValue } from "jotai";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

import { AuthTokenAtom } from "@/atoms/Auth";
import { App } from "@/components/App";
import { Theme } from "@/components/Theme";
import { useIsomorphicEffect } from "@/libraries/IsomorphicEffect";
import { requests } from "@/libraries/requests";

export default function Main({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const token = useAtomValue(AuthTokenAtom);
  const isomorphicEffect = useIsomorphicEffect();
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  isomorphicEffect(() => {
    if (token) {
      requests.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <Theme>
      <App>
        <Component {...pageProps} />
      </App>
    </Theme>
  );
}
