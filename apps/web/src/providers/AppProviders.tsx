import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chains, client } from '../connectors';
import { PropsWithChildren } from 'react';
import ModalProvider from 'components/Modal/Modal';
import TransactionProvider from 'context/useTx';
import { BlockNumberProvider } from 'hooks/useBlockNumber';
import CredentialProvider from 'context/Credential/CredentialContext';
import FactoryUpdater from 'services/orgs/updater';

function Updaters() {
  return (
    <>
      <FactoryUpdater />
    </>
  )
}

function AppProviders({ children }: PropsWithChildren<unknown>) {
  return (
    <TransactionProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <BlockNumberProvider>
            <Updaters />
            <CredentialProvider>
              <ModalProvider classes="bg-black bg-opacity-50 backdrop-blur-xl fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
                {children}
              </ModalProvider>
            </CredentialProvider>
          </BlockNumberProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </TransactionProvider>
  );
}

export default AppProviders;
