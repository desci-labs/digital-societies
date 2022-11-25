import { ChainIds } from "./chains";

type AddressMap = { [chainId: number]: string };

export const SB_FACTORY_ADDRESS: AddressMap = {
  [ChainIds.GOERLI]: "0x03Bf48e556628cBAd725f38bC7cA9af074c86709",
  [ChainIds.LOCALHOST]: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
  [ChainIds.MAINNET]: "0xfEa9425A4566c9FecC81271fD48eFA57c92faA34",
};

export const PAYMASTER_ADDRESS: AddressMap = {
  [ChainIds.GOERLI]: "0xda497347D894Fdb9D2DB43192e65A99371747c5C",
  [ChainIds.LOCALHOST]: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  [ChainIds.MAINNET]: "0xda497347D894Fdb9D2DB43192e65A99371747c5C",
};
