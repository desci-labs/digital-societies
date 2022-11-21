import "../styles/globals.css";
import "../styles/preview.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import AppProviders from "providers/AppProviders";
import Layout from "components/layout";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <AppProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProviders>
    </ThemeProvider>
  );
}

export default MyApp;
