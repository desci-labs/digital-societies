import Loader from "components/Loader";
import { AttestationList } from "components/UI/Attestation/Index";
import { ContentGrid } from "components/UI/Index";
import { Delegates } from "components/UI/Attestation/Delegates/Delegates";
import MetaDetails from "components/UI/MetaDataView";
import { Org, PendingOrg } from "services/orgs/types";
import useUpdater from "components/Transactors/org/Updator/useUpdater";
import { useIsAdmin } from "services/orgs/hooks";

export default function DesocDetails(props: {
  desoc: Org | PendingOrg;
  showUpdaters?: boolean;
}) {
  const showUpdater = useUpdater(props.desoc);
  const isAdmin = useIsAdmin(props.desoc.address);
  if (!props.desoc) return <Loader className="h-screen" />;

  return (
    <ContentGrid>
      <MetaDetails
        metadata={props.desoc.metadata}
        address={props.desoc.address}
        verified={props.desoc.verified}
        showUpdater={props.showUpdaters && isAdmin}
        onUpdateClick={showUpdater}
      />
      <AttestationList
        address={props.desoc.address}
        showUpdater={props.showUpdaters}
      />
      {props.showUpdaters && <Delegates
        address={props.desoc.address}
        showUpdater={props.showUpdaters}
      />}
    </ContentGrid>
  );
}
