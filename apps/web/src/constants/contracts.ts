import { ChainIDs, SupportedChainId } from "./chains";
import Factory from "@desoc/contracts/src/abis/Factory.json";
import SBToken from "@desoc/contracts/src/abis/Desoc.json";
export interface Contract {
  address: string;
  name: string;
  type: Contracts;
  artifact: JSON;
  chainId: ChainIDs | SupportedChainId;
}

export enum Contracts {
  Factory = "Factory",
  SBToken = "SBToken",
  Paymaster = "Paymaster",
}

export const contracts = [
  {
    address: "0x7dd28dae4badd898288ecea5ca2ed5def1ee6b56",
    name: "Factory",
    id: Contracts.Factory,
    artifact: Factory.abi,
    chainId: ChainIDs.GOERLI,
  },
  {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    name: "Factory",
    id: Contracts.Factory,
    artifact: Factory.abi,
    chainId: ChainIDs.LOCALHOST,
  },
  {
    address: "",
    name: "SBToken",
    id: Contracts.SBToken,
    artifact: SBToken.abi,
    chainId: ChainIDs.GOERLI,
  },
];
