import { Contracts, contracts } from "constants/contracts";
import { SBToken, SBToken__factory } from "constants/types";
import { SBFactory } from "constants/types/SBFactory";
import { useContract, useProvider, useSigner } from "wagmi";

export function getContract(type: Contracts) {
  return contracts.find((c) => c.id === type);
}

export const useFactoryContract = (): SBFactory => {
  const library = useProvider();
  const contract = getContract(Contracts.Factory);
  return useContract({
    addressOrName: contract?.address!,
    contractInterface: contract?.artifact!,
    signerOrProvider: library,
  });
};

export const useSBTContractFactory = () => {
  const contract = getContract(Contracts.SBToken);
  const { data } = useSigner();

  return (address: string): SBToken => {
    return SBToken__factory.getContract(address!, contract?.artifact!, data!) as SBToken
  };
};

export const useTokenContract = () => {
  const contract = getContract(Contracts.SBToken);
  const { data: signer } = useSigner();

  return (address: string): SBToken => {
    return SBToken__factory.getContract(address!, contract?.artifact!, signer!).connect(signer!) as SBToken
  };
};
