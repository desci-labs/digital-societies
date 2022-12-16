import { useGetOrg } from "services/orgs/hooks";
import DesocDetails, { Placeholder } from "components/UI/Desoc/DesocDetails";
import useRouterAddress from "hooks/useRouterAddress";
import useDashboard from "hooks/useDashboard";
import { useGetDesocBadges } from "services/thegraph/desoc/hooks";

export default function DesocDetailsPage() {
  const address = useRouterAddress();
  useGetDesocBadges(address);

  const { org: adminOrg } = useDashboard();

  const org = useGetOrg(address as string);

  if (!org) return <Placeholder />;

  return (
    <DesocDetails
      desoc={org}
      showUpdaters={org.address === adminOrg?.address}
    />
  );
}
