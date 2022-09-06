import { Contracts, contracts } from "constants/contracts";
import { Contract } from "ethers";
import { useContract, useSigner } from "wagmi";

export function getContract(type: Contracts) {
  return contracts.find((c) => c.id === type);
}

export const useFactoryContract = (): Contract => {
  const { data: signer } = useSigner();
  const contract = getContract(Contracts.Factory);
  return useContract({
    addressOrName: contract?.address!,
    contractInterface: contract?.artifact!,
    signerOrProvider: signer,
  });
};
