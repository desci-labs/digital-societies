import { Contracts, contracts } from "constants/contracts";
import { Contract, ethers } from "ethers";
import { useContract, useProvider, useSigner } from "wagmi";

export function getContract(type: Contracts) {
  return contracts.find((c) => c.id === type);
}

export const useFactoryContract = (): Contract => {
  const library = useProvider();
  const contract = getContract(Contracts.Factory);
  return useContract({
    addressOrName: contract?.address!,
    contractInterface: contract?.artifact!,
    signerOrProvider: library,
  });
};

export const useSBTContractFactory = () => {
  // const { data: signer } = useSigner();
  const library = useProvider();
  const contract = getContract(Contracts.SBToken);

  return (address: string): Contract => new ethers.Contract(address, contract?.artifact!, library)
};
