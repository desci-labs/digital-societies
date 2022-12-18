import { useGetOrgs } from "services/orgs/hooks";
import { useAccount } from "wagmi";
import useRouterAddress from "./useRouterAddress";

function useConnectedUserDesoc(address = "") {
  const orgs = useGetOrgs();
  return orgs.filter(
    (org) =>
      org.admin.toLowerCase() === address.toLowerCase() ||
      org.delegates.includes(address)
  );
}

export default function useDashboard() {
  const { address: account } = useAccount();
  const address = useRouterAddress();
  const orgs = useConnectedUserDesoc(account);
  const hasAccess =
    account &&
    orgs.find((o) => o.address === address || o.delegates.includes(account));
  const currentOrg = account
    ? orgs.find(
        (o) =>
          (account && o.address === address) ||
          o.admin === account ||
          o.delegates.includes(account)
      ) ?? orgs[0]
    : null;

  return { org: currentOrg, showDashboard: !!currentOrg, hasAccess };
}
