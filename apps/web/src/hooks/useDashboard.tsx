import { useGetOrgs } from "services/orgs/hooks";
import { useAccount } from "wagmi";

function useConnectedUserDesoc(address: string = "") {
  const orgs = useGetOrgs();
  return orgs.find(org => org.admin === address || org.delegates.includes(address))
}

export default function useDashboard() {
  const { address } = useAccount();
  const org = useConnectedUserDesoc(address);

  return { org, showDashboard: !!org }
}