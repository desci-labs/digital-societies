import { SupportedChainId } from "constants/chains";

export const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [SupportedChainId.GOERLI]:
    "https://graph-goerli-dev.desci.com/subgraphs/name/desoc",
  [SupportedChainId.LOCALHOST]: "http://localhost:8000/subgraphs/name/desoc",
};
