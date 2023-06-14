import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      {/* <Head /> */}
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Portifólio de Flávio Leonardo" />
        <meta name="robots" content="index, follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
