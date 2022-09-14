import { ChainIDs, SupportedChainId } from "./chains";
import Factory from "./abis/SBFactory.sol/SBFactory.json";
import SBToken from "./abis/SBToken.sol/SBToken.json";

export interface Contract {
  address: string;
  name: string;
  type: Contracts;
  artifact: any;
  chainId: ChainIDs | SupportedChainId;
}

export enum Contracts {
  Factory = "Factory",
  SBToken = "SBToken",
}

export const contracts = [
  {
    address: "0x0e3c9450774cb1dad9f577967ee9f9e8444d97eb",
    name: "Factory",
    id: Contracts.Factory,
    artifact: Factory.abi,
    chainId: ChainIDs.GOERLI,
  },
  {
    address: "",
    name: "SBToken",
    id: Contracts.SBToken,
    artifact: SBToken.abi,
    chainId: ChainIDs.GOERLI,
  },
];
