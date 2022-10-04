import { SupportedChainId } from "./chains";

type AddressMap = { [chainId: number]: string };

export const SB_FACTORY_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: "0xfEa9425A4566c9FecC81271fD48eFA57c92faA34",
  [SupportedChainId.LOCALHOST]: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
  [SupportedChainId.MAINNET]: "",
};

export const PAYMASTER_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: "0x7C10d29cfc9951958d8ffF6d9D9c9697A146bf70",
  [SupportedChainId.LOCALHOST]: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  [SupportedChainId.MAINNET]: "",
};
