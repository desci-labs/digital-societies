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
    address: "0x4275862b287fbfb4c47785ae90f01afdf386c043",
    name: "Factory",
    id: Contracts.Factory,
    artifact: Factory.abi,
    chainId: ChainIDs.GOERLI,
  },
];
