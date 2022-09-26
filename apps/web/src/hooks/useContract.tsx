import { Contracts, contracts } from "constants/contracts";
import { SBToken, SBToken__factory } from "constants/types";
import { SBFactory } from "constants/types/SBFactory";
import { DEFAULT_CHAIN, RPC_URLS } from "constants/web3";
import { ethers } from "ethers";
import { useContract, useProvider, useSigner } from "wagmi";

const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(RPC_URLS[DEFAULT_CHAIN])

export function getContract(type: Contracts) {
  return contracts.find((c) => c.id === type);
}

export const useFactoryContract = (): SBFactory => {
  const library = useProvider();
  const { data: signer } = useSigner();
  const contract = getContract(Contracts.Factory);
  return useContract({
    addressOrName: contract?.address!,
    contractInterface: contract?.artifact!,
    signerOrProvider: signer || library || DEFAULT_PROVIDER,
  });
};

export const useTokenContract = () => {
  const contract = getContract(Contracts.SBToken);
  const { data: signer } = useSigner();
  const provider = useProvider();
  
  return (address: string): SBToken => {
    return SBToken__factory.getContract(address!, contract?.artifact!, signer!).connect(signer! || provider) as SBToken
  };
};
