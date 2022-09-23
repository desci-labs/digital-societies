import { useGetter } from "store/accessors";
import { useAccount } from "wagmi";

export function useGetOrgState() {
  const state = useGetter(state => state.org);
  return state
}
export function useGetOrgs() {
  const { data } = useGetter(state => state.org);
  return data
}
export function useGetOrg(address: string) {
  const { data } = useGetter(state => state.org);
  return data.find((org) => org.address === address);
}

export function useIsAdmin(address: string) {
  const account = useAccount();
  const org = useGetOrg(address);
  return org?.admin === account.address;
}

export function useIsDelegate(address: string) {
  const { address: user } = useAccount();
  const org = useGetOrg(address);
  return !!org?.delegates.some((member) => member === user);
}

export function useCanMintCredential(address: string) {
  const isDelegate = useIsDelegate(address);
  const isAdmin = useIsAdmin(address,);
  return isDelegate || isAdmin;
}

export function useCanMutateOrg(address: string) {
  const isAdmin = useIsAdmin(address);
  return isAdmin;
}
