import { useGetOrgs } from "services/orgs/hooks";
import { useAccount } from "wagmi";
import useRouterAddress from "./useRouterAddress";

function useConnectedUserDesoc(address = "") {
  const orgs = useGetOrgs();
  return orgs.filter(
    (org) =>
      org.admin.toLowerCase() === address.toLowerCase() ||
      org.delegates.some(
        (value) => value.toLowerCase() === address.toLowerCase()
      )
  );
}

export default function useDashboard() {
  const { address: account } = useAccount();
  const address = useRouterAddress();
  const orgs = useConnectedUserDesoc(account);
  const hasAccess =
    account &&
    orgs.find(
      (o) =>
        o.address.toLowerCase() === address?.toLowerCase() ||
        o.delegates.includes(account.toLowerCase())
    );
  const currentOrg = account
    ? orgs.find(
        (o) =>
          (account && o.address.toLowerCase() === address?.toLowerCase()) ||
          o.admin.toLowerCase() === account.toLowerCase() ||
          o.delegates.includes(account.toLowerCase())
      ) ?? orgs[0]
    : null;

  return { org: currentOrg, showDashboard: !!currentOrg, hasAccess };
}
