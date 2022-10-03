import { SupportedChainId } from "./chains";

type AddressMap = { [chainId: number]: string };

export const SB_FACTORY_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: "0x7dd28dae4badd898288ecea5ca2ed5def1ee6b56",
  [SupportedChainId.LOCALHOST]: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
  [SupportedChainId.MAINNET]: "0x7dd28dae4badd898288ecea5ca2ed5def1ee6b56",
};

export const PAYMASTER_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: "",
  [SupportedChainId.LOCALHOST]: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  [SupportedChainId.MAINNET]: "",
};
