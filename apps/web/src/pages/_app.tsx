import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import AppProviders from "providers/AppProviders";
import Layout from "components/layout";
import { Provider } from "react-redux";
import { store, persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "react-error-boundary";
import AppFallback from "components/Fallback/AppFallback";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      <ThemeProvider attribute="class">
        <Provider store={store}>
          <Head>
            <title>Deciety</title>
            <meta
              name="description"
              content="Deciety | Tooling for Desoc by Desci Labs"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <PersistGate loading={null} persistor={persistor}>
            <AppProviders>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AppProviders>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
