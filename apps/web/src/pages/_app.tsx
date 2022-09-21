import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import AppProviders from 'providers/AppProviders';
import Layout from 'components/layout';
import { Provider } from 'react-redux';
import { store, persistor } from 'store/store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProviders>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProviders>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
