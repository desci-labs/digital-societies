import { createClient } from 'wagmi';
import { configureChains } from 'wagmi';
import { chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const gorliChain = {
  id: 5,
  name: 'Görli',
  network: 'görli',
  iconUrl: 'https://goerli.etherscan.io/images/go.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH'
  },
  rpcUrls: {
    default: 'https://goerli.infura.io/v3/1b91f66482d64c7e900913c7763227f2'
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://goerli.etherscan.io/' },
    etherscan: { name: 'Etherscan', url: 'https://goerli.etherscan.io/' }
  },
  testnet: true
};

export const { chains, provider } = configureChains(
  [gorliChain, chain.mainnet], // chain.arbitrum, chain.polygon, chain.rinkeby
  [publicProvider()]
);

export const { connectors } = getDefaultWallets({
  appName: 'Credential Manager',
  chains
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider
});
