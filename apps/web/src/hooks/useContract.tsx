import { wrapContract } from "@opengsn/provider/dist/WrapContract";
import { PAYMASTER_ADDRESS, SB_FACTORY_ADDRESS } from "constants/addresses";
import { SBToken, SBToken__factory } from "constants/types";
import { SBFactory } from "constants/types/SBFactory";
import { DEFAULT_CHAIN, RPC_URLS } from "constants/web3";
import { Contract, ethers } from "ethers";
import { useContract, useNetwork, useProvider, useSigner } from "wagmi";
// import FactoryAbi from "../constants/abis/SBFactory.sol/SBFactory.json";
import FactoryV2Abi from "../constants/abis/SBFactoryV2.sol/SBFactoryV2.json";
import SBTAbi from "../constants/abis/SBToken.sol/SBToken.json";

export const useDefaultProvider = () => {
  const { chain } = useNetwork();
  const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(RPC_URLS[chain?.id ?? DEFAULT_CHAIN])
  return DEFAULT_PROVIDER;
}

export const useFactoryContract = (): SBFactory => {
  const library = useProvider();
  const { chain } = useNetwork()
  const { data: signer } = useSigner();
  const DEFAULT_PROVIDER = useDefaultProvider()
  const address = SB_FACTORY_ADDRESS[chain?.id ?? DEFAULT_CHAIN];

  return useContract({
    addressOrName: address,
    contractInterface: FactoryV2Abi.abi,
    signerOrProvider: signer || library || DEFAULT_PROVIDER,
  });
};

export const useWrapContract = () => {

  return (contract: Contract, chainId: number) => wrapContract(contract, {
    paymasterAddress: PAYMASTER_ADDRESS[chainId],
    performDryRunViewRelayCall: false,
    // preferredRelays: [],
  })
}

export const useTokenContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();
  
  return (address: string): SBToken => {
    return SBToken__factory.getContract(address!, SBTAbi.abi, signer!).connect(signer! || provider) as SBToken
  };
};
