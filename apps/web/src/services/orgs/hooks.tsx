import { useGetter } from "store/accessors";
import { useAccount } from "wagmi";

export function useGetOrgState() {
  const state = useGetter((state) => state.org);
  return state;
}
export function useGetOrgs() {
  const { data } = useGetter((state) => state.org);
  return data;
}

export function useGetOrg(address: string) {
  const { data } = useGetter((state) => state.org);
  return data.find((org) => org.address === address);
}

export function useGetDesocMeta(address: string) {
  const { data } = useGetter((state) => state.org);
  return data.find((org) => org.address === address)?.metadata;
}

export function useIsAdmin(address: string) {
  const account = useAccount();
  const org = useGetOrg(address);
  return org?.admin.toLowerCase() === account.address?.toLowerCase();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useIsDelegate(address: string) {
  const { address: user } = useAccount();
  const org = useGetOrg(address);
  return user && org?.delegates.includes(user.toLowerCase());
}

export function useIsAdminOrDelegate(address: string) {
  const isDelegate = useIsDelegate(address);
  const isAdmin = useIsAdmin(address);
  return isDelegate || isAdmin;
}
