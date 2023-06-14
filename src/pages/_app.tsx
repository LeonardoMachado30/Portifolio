import type { AppProps } from "next/app";
import Head from "next/head";
import * as gtag from "@/utils/Analitcs/gtag";
import Analytics from "@/utils/Analitcs/Analitcs";
import "@/styles/globals.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (gtag) {
      const handleRouteChange = (url) => {
        gtag.pageview(url);
      };

      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
