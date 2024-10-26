import "@/styles/global.scss";
import "@/styles/nprogress.css";
import "@radix-ui/themes/styles.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

import { App } from "@/components/App";
import { Theme } from "@/components/Theme";

export default function Main({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
  return (
    <Theme>
      <App>
        <Component {...pageProps} />
      </App>
    </Theme>
  );
}
