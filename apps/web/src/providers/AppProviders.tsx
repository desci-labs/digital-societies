import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig } from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chains, client } from "../connectors";
import { PropsWithChildren } from "react";
import ModalProvider from "components/Modal/Modal";
import TransactionProvider from "context/useTx";
import { BlockNumberProvider } from "hooks/useBlockNumber";
import FactoryUpdater from "services/orgs/updater";
import TokenUpdater from "services/attestations/TokenUpdater";
import AttestationUpdater from "services/attestations/updater";
import AppMenuProvider from "components/layout/Header/useAppMenu";
import { useTheme } from "next-themes";
import FormViewProvider from "context/useFormView";

function Updaters() {
  return (
    <>
      <FactoryUpdater />
      <TokenUpdater />
      <AttestationUpdater />
    </>
  );
}

function AppProviders({ children }: PropsWithChildren<unknown>) {
  const { resolvedTheme } = useTheme();

  const getTheme = () =>
    resolvedTheme === "dark"
      ? darkTheme({
          accentColor: "#28AAC4",
          accentColorForeground: "#000000",
          overlayBlur: "large",
        })
      : lightTheme({
          accentColor: "#28AAC4",
          accentColorForeground: "#ffffff",
        });

  return (
    <TransactionProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider theme={getTheme()} chains={chains}>
          <BlockNumberProvider>
            <Updaters />
            <FormViewProvider>
              <ModalProvider classes="p-3 bg-black bg-opacity-50 backdrop-blur-xl fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
                <AppMenuProvider>{children}</AppMenuProvider>
              </ModalProvider>
            </FormViewProvider>
          </BlockNumberProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </TransactionProvider>
  );
}

export default AppProviders;
