import { Chain } from "wagmi";

export const getTransactionUrl = (hash: string, chain: Chain) => {
  return `${chain.blockExplorers?.default.url}tx/${hash}`;
};