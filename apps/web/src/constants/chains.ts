/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum ChainIds {
  MAINNET = 1,
  GOERLI = 5,
  LOCALHOST = 1337,
}

export enum SupportedChainId {
  // MAINNET = 1,
  GOERLI = 5,
  // LOCALHOST = 1337
}

export enum ChainIDs {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
}

/**
 * Array of all the supported chain IDs
 */
export const SUPPORTED_CHAIN_IDS: ChainIDs[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as unknown as ChainIDs[];
