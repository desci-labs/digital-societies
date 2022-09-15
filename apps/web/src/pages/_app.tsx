import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import AppProviders from 'providers/AppProviders';
import Layout from 'layout';
import { Provider } from 'react-redux';
import store from 'store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProviders>
    </Provider>
  );
}

export default MyApp;
