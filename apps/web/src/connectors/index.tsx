import { createClient } from 'wagmi';
import { configureChains } from 'wagmi';
import { chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import AvaxLogo from '../avax.svg';

const avalancheChain = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  iconUrl: AvaxLogo,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX'
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc'
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' }
  },
  testnet: false
};

export const { chains, provider } = configureChains(
  [avalancheChain, chain.mainnet, chain.arbitrum, chain.polygon, chain.rinkeby],
  [publicProvider()]
);

export const { connectors } = getDefaultWallets({
  appName: 'Rainbowkit-Wagmi-Demo-React',
  chains
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider
});
