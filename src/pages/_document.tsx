import ReactGA from "react-ga";
const TRACKING_ID = "G-JW0FSYRYGZ"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
// ReactGA.pageview(window.location.pathname + window.location.search);
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
