import Loader from "components/Loader";
import { AttestationList } from "components/UI/Attestation/Index";
import { ContentGrid } from "components/UI/Index";
import { Delegates } from "components/UI/Attestation/Delegates/Delegates";
import MetaDetails from "components/UI/MetaDataView";
import { Org, PendingOrg } from "services/orgs/types";
import useUpdater from "components/Transactors/org/Updator/useUpdater";
import { useIsAdminOrDelegate } from "services/orgs/hooks";
import ContentLoader, {
  CircularLoader,
} from "components/ContentLoader/ContentLoader";

export default function DesocDetails(props: {
  desoc: Org | PendingOrg;
  showUpdaters?: boolean;
}) {
  const showUpdater = useUpdater(props.desoc);
  const isAdminOrDelegate = useIsAdminOrDelegate(props.desoc.address);
  if (!props.desoc) return <Loader className="h-screen" />;

  return (
    <ContentGrid>
      <MetaDetails
        banner={props.desoc.metadata.banner}
        metadata={props.desoc.metadata}
        address={props.desoc.address}
        verified={props.desoc.verified}
        showUpdater={props.showUpdaters && isAdminOrDelegate}
        onUpdateClick={showUpdater}
      />
      <AttestationList
        address={props.desoc.address}
        showUpdater={props.showUpdaters}
      />
      {props.showUpdaters && (
        <Delegates
          address={props.desoc.address}
          showUpdater={props.showUpdaters}
        />
      )}
    </ContentGrid>
  );
}

export function Placeholder() {
  return (
    <ContentGrid>
      <div className="w-full">
        <div className="relative h-88">
          <ContentLoader className="h-88 w-full" />
          <div className="w-full h-32 absolute left-3 -bottom-11">
            <div className="container mx-auto h-32">
              <CircularLoader className="w-32 h-32" />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-2 mt-16 flex flex-col justify-between gap-1 h-32">
          <ContentLoader className="w-32 h-4 mt-4" />
          <ContentLoader className="w-80 h-6 mt-4" />
          <ContentLoader className="w-80 h-6" />
          <ContentLoader className="w-80 h-6" />
        </div>
      </div>
    </ContentGrid>
  );
}
