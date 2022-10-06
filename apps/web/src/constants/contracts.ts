import { ChainIDs, SupportedChainId } from "./chains";
import Factory from "./abis/DesocManager.json";
import SBToken from "./abis/Desoc.json";

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
    address: "",
    name: "SBToken",
    id: Contracts.SBToken,
    artifact: SBToken.abi,
    chainId: ChainIDs.GOERLI,
  },
];
