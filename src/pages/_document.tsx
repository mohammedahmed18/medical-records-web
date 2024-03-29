import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' data-theme='light'>
      <Head>
        <meta
          http-equiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
