import { Header } from "@/components";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </RecoilRoot>);
}
