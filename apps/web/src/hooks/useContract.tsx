import { Contract, Contracts, contracts } from "constants/contracts";

export function useContract(type: Contracts) {
  return contracts.find(c => c.id === type);
}