import { useGetOrg, useGetOrgs } from "services/orgs/hooks";
import { useAccount } from "wagmi";
import useRouterAddress from "./useRouterAddress";

function useConnectedUserDesoc(address: string = "") {
  const orgs = useGetOrgs();
  return orgs.find(org => org.admin === address || org.delegates.includes(address))
}

export default function useDashboard() {
  const { address: account } = useAccount();
  const address = useRouterAddress();
  const org = useConnectedUserDesoc(account);
  const currentOrg = useGetOrg(address);
  
  return { org, showDashboard: !!org, hasAccess: currentOrg && currentOrg.address === org?.address }
}
