import { SupportedChainId } from "constants/chains";

export const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [SupportedChainId.GOERLI]: "",
  [SupportedChainId.LOCALHOST]: "http://localhost:8000/subgraphs/name/desoc",
};
