import Loader from "components/Loader";
import { AttestationList } from "components/UI/Attestation/Index";
import { ContentGrid } from "components/UI/Index";
import { Delegates } from "components/UI/Attestation/Delegates";
import DesocMetaDetails from "components/UI/DesocMetaDetails";
import { Org, PendingOrg } from "services/orgs/types";

export default function DesocDetails(props: { desoc: Org | PendingOrg; showUpdaters?: boolean }) {

  if (!props.desoc) return <Loader className="h-screen" />;

  return (
    <ContentGrid>
      <DesocMetaDetails org={props.desoc} showUpdater={props.showUpdaters} />
      <AttestationList address={props.desoc.address} showUpdater={props.showUpdaters} />
      <Delegates address={props.desoc.address} showUpdater={props.showUpdaters} />
    </ContentGrid>
  );
}

