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
    address: "0xbdd93ddcce4d8b1a56a3e27698a29899dc3d01ca",
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
