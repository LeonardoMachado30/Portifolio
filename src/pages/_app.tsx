import ReactGA from "react-ga";
const TRACKING_ID = "G-JW0FSYRYGZ"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
import type { AppProps } from "next/app";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
