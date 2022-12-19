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

export function useGetOrg(address = "") {
  console.log("useGetOrg: ", address);
  const { data } = useGetter((state) => state.org);
  return data.find(
    (org) => org.address.toLowerCase() === address.toLowerCase()
  );
}

export function useGetDesocMeta(address = "") {
  const { data } = useGetter((state) => state.org);
  return data.find((org) => org.address.toLowerCase() === address.toLowerCase())
    ?.metadata;
}

export function useIsAdmin(address = "") {
  const account = useAccount();
  const org = useGetOrg(address);
  return org?.admin.toLowerCase() === account.address?.toLowerCase();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useIsDelegate(address = "") {
  const { address: user } = useAccount();
  const org = useGetOrg(address);
  return user && org?.delegates.includes(user.toLowerCase());
}

export function useIsAdminOrDelegate(address = "") {
  const isDelegate = useIsDelegate(address);
  const isAdmin = useIsAdmin(address);
  return isDelegate || isAdmin;
}
