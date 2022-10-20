import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <>
      <Html>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossOrigin="anonymous"
          />
          {/* <link
            href="http://fonts.cdnfonts.com/css/sf-pro-display"
            rel="stylesheet"
          ></link> */}
        </Head>
        <body className="main_body">
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossOrigin="anonymous"
            async
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  );
}
