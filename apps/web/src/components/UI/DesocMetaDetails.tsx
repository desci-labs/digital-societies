import { VerifiedBadgeIcon } from "assets/svg";
import useUpdater from "components/Transactors/org/Updator/useUpdater";
import { getImageURL } from "helper";
import { FiEdit } from "react-icons/fi";
import { useIsAdmin } from "services/orgs/hooks";
import { Org, PendingOrg } from "services/orgs/types";
import Button from "./Button/Index";
import { ImageBanner, RoundedLogo } from "./Index";

export default function DesocMetaDetails(props: { org: Org | PendingOrg; showUpdater?: boolean }) {

  return (
    <div className="w-full">
      <div className="w-full h-88 relative group">
        <ImageBanner src={getImageURL(props.org.metadata.banner)} alt={props.org.metadata.name} />
        <RoundedLogo src={getImageURL(props.org.metadata.image)} alt={props.org.metadata.name} />
      </div>
      <div className="container mx-auto mt-12 px-2 lg:px-0">
        <div className="flex gap-2 items-center mb-2">
          <span className="heading-1 text-left">
            {props.org.metadata.name}
          </span>
          {props.org.verified && <VerifiedBadgeIcon width="25" heigth="25" />}
          {props.showUpdater && <DesocUpdater desoc={props.org} />}
        </div>
        <span className="text-lg block mb-2 text-left text-neutrals-gray-5">
          {props.org.metadata.description}
        </span>
      </div>
    </div>
  )
}

function DesocUpdater(props: { desoc: Org | PendingOrg }) {
  const hasAccess = useIsAdmin(props.desoc.address);
  const showUpdater = useUpdater(props.desoc);

  return <>
    {hasAccess && (
      <Button
        onClick={() => showUpdater()}
        className="flex items-center justify-evenly focus:outline-white bg-transparent px-2 p-1 font-bold"
      >
        <FiEdit className="text-darker" />
      </Button>
    )}</>
}