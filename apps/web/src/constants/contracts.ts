import { ChainIDs, SupportedChainId } from "./chains";
import Factory from "./abis/SBFactory.sol/SBFactory.json";

export interface Contract {
  address: string;
  name: string;
  type: Contracts;
  artifact: any;
  chainId: ChainIDs | SupportedChainId;
}

export enum Contracts {
  Factory = "Factory",
}

export const contracts = [
  {
    address: "0xb0EeA41Aa2C32693889F9173b8cFD29936aE69da",
    name: "Factory",
    id: Contracts.Factory,
    artifact: Factory.abi,
    chainId: ChainIDs.GOERLI,
  },
];
