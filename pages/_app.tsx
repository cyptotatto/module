import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import dynamic from "next/dynamic";

declare global {
  interface Window {
    ethereum: any;
  }
}

const DynamicLogin = dynamic(() => import("../src/components/LoginBox"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <DynamicLogin />
    </RecoilRoot>
  );
}

export default MyApp;
