import { ChainIds } from "./chains";

type AddressMap = { [chainId: number]: string };

export const SB_FACTORY_ADDRESS: AddressMap = {
  [ChainIds.GOERLI]: "0x69301853f23a924258Db97A955454ac71d07e528",
  [ChainIds.LOCALHOST]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  // [ChainIds.MAINNET]: "0xfEa9425A4566c9FecC81271fD48eFA57c92faA34",
};

export const DATA_HOLDER: AddressMap = {
  [ChainIds.GOERLI]: "0xF0cB9886197a28a4Fe926CED4F6582a1DA17973d",
  [ChainIds.LOCALHOST]: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  // [ChainIds.MAINNET]: "0xfEa9425A4566c9FecC81271fD48eFA57c92faA34",
};

export const PAYMASTER_ADDRESS: AddressMap = {
  [ChainIds.GOERLI]: "0xda497347D894Fdb9D2DB43192e65A99371747c5C",
  [ChainIds.LOCALHOST]: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  // [ChainIds.MAINNET]: "0xda497347D894Fdb9D2DB43192e65A99371747c5C",
};
