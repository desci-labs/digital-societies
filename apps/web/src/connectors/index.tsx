import { createClient } from "wagmi";
import { configureChains } from "wagmi";
import { chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { DEFAULT_CHAIN, RPC_URLS } from "constants/web3";
import { IS_DEV } from "config/Index";

const gorliChain = {
  id: 5,
  name: "Görli",
  network: "görli",
  iconUrl: "https://goerli.etherscan.io/images/go.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: RPC_URLS[DEFAULT_CHAIN],
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://goerli.etherscan.io/" },
    etherscan: { name: "Etherscan", url: "https://goerli.etherscan.io/" },
  },
  testnet: true,
};

export const { chains, provider } = configureChains(
  [gorliChain, IS_DEV ? chain.localhost : gorliChain],
  [publicProvider()]
);

export const { connectors } = getDefaultWallets({
  appName: "Desoc Manager",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});
