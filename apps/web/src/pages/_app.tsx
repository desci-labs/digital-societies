import "../styles/globals.css";
import "../styles/preview.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import AppProviders from "providers/AppProviders";
import Layout from "components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  );
}

export default MyApp;
