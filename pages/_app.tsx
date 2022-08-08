import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("App is Running");
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((r) => r.json()) }}
    >
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
