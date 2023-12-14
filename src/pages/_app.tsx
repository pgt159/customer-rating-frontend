// @ts-nocheck
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import { Poppins } from "next/font/google";
import theme from "@/theme/themeConfig";
import { ReduxProvider } from "../store/provider";
import Meta from "@/component/meta/Meta";

const queryClient = new QueryClient();

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            autoClose={500}
            hideProgressBar={false}
            closeOnClick
            limit={1}
          />
          <div className={poppins.className}>
            <Meta />
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </ConfigProvider>
    </ReduxProvider>
  );
}
