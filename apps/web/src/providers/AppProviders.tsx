import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chains, client } from '../connectors';
import { PropsWithChildren } from 'react';
import ModalProvider from 'components/Modal/Modal';
import TransactionProvider from 'context/useTx';

function AppProviders({ children }: PropsWithChildren<unknown>) {
  return (
    <TransactionProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <ModalProvider classes="bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
            {children}
          </ModalProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </TransactionProvider>
  );
}

export default AppProviders;
