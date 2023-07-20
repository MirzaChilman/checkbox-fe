import Navbar from "@/components/Navbar";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import { Noto_Sans_JP } from "next/font/google";
import Head from "next/head";
import "@/styles/global.css";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
          },
        },
      })
  );
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>Atask</title>
          </Head>
          <div className={notoSans.className}>
            <Navbar />
            <Component {...pageProps} />
          </div>
          {process.env.NEXT_PUBLIC_NODE_ENV === "dev" && <ReactQueryDevtools />}
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}
