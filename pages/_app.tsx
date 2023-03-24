import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import "@/styles/global.scss";
import "@/styles/nprogress.css";
import { App } from "@/components/App/App";

export default function _app({ Component, pageProps }: AppProps) {
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
    <App>
      <Component {...pageProps} />
    </App>
  );
}
