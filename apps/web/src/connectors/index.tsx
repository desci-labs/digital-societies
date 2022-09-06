import { createClient } from 'wagmi';
import { configureChains } from 'wagmi';
import { chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import AvaxLogo from 'pages/../assets/avax.svg';

const gorliChain = {
  id: 5,
  name: 'Görli',
  network: 'görli',
  iconUrl: AvaxLogo,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH'
  },
  rpcUrls: {
    default: 'https://rpc.ankr.com/eth_goerli	'
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://goerli.etherscan.io/' },
    etherscan: { name: 'Etherscan', url: 'https://goerli.etherscan.io/' }
  },
  testnet: true
};

export const { chains, provider } = configureChains(
  [gorliChain, chain.mainnet, chain.arbitrum, chain.polygon, chain.rinkeby],
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
