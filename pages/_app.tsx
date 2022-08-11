import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "react-loading-skeleton/dist/skeleton.css";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("App is Running");
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((r) => r.json()) }}
    >
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
      {/* <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          window.fbAsyncInit = function () {
            FB.init({
              appId: "your-app-id",
              autoLogAppEvents: true,
              xfbml: true,
              version: "v14.0",
            });
          };
        }}
      /> */}
    </SWRConfig>
  );
}

export default MyApp;
