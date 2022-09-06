/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  MAINNET = 1,
  GOERLI = 5,
}

export enum ChainIDs {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
}

export const CHAIN_IDS_TO_NAMES = {
  [ChainIDs.MAINNET]: "mainnet",
  [ChainIDs.GOERLI]: "goerli",
  [ChainIDs.KOVAN]: "kovan",
};

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: ChainIDs[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as unknown as ChainIDs[];
