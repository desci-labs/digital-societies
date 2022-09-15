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

export function useIsAdmin(address: string, user: string) {
  const org = useGetOrg(address);
  return org?.admin === user;
}

export function useIsDelegate(address: string, user: string) {
  const org = useGetOrg(address);
  return !!org?.delegates.some((member) => member === user);
}

export function useCanMutateOrg(address: string) {
  const account = useAccount();
  const isAdmin = useIsAdmin(address, account.address ?? "");
  const isDelegate = useIsDelegate(address, account.address ?? "");
  return isAdmin || isDelegate;
}
