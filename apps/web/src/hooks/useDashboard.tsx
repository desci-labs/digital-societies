import { useGetOrgs } from "services/orgs/hooks";
import { useAccount } from "wagmi";
import useRouterAddress from "./useRouterAddress";

function useConnectedUserDesoc(address = "") {
  const orgs = useGetOrgs();
  return orgs.filter(
    (org) => org.admin.toLowerCase() === address.toLowerCase() // update delegates detection logic
  );
}

export default function useDashboard() {
  const { address: account } = useAccount();
  const address = useRouterAddress();
  const orgs = useConnectedUserDesoc(account);
  const hasAccess = orgs.find((o) => o.address === address);
  const currentOrg =
    orgs.find((o) => o.address === address || o.admin === account) ?? orgs[0];

  return { org: currentOrg, showDashboard: !!currentOrg, hasAccess };
}
