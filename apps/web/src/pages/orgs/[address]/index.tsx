import { useRouter } from "next/router";
import Loader from "components/Loader";
import { useGetOrg, useIsAdmin } from "services/orgs/hooks";
import { AttestationGridView } from "components/UI/Attestation/Index";
import { ImageBanner, RoundedLogo } from "components/UI/Index";
import { getImageURL } from "helper";
import useUpdater from "components/Transactors/org/Updator/useUpdater";
import { useEffect, useState } from "react";
import Button from "components/UI/Button/Index";
import { FiEdit } from "react-icons/fi";
import { Delegates } from "components/UI/Attestation/Delegates";
import { RevocationHistory } from "components/UI/Attestation/RevocationHistory";

export default function OrganisationDetails() {
  const router = useRouter();
  const [{ address }, setRouterQuery] = useState({ address: '' });

  const org = useGetOrg(address as string);
  const hasAccess = useIsAdmin(org?.address!);
  const showUpdater = useUpdater(org!);

  useEffect(() => {
    if (router.isReady) {
      const { address } = router.query;
      setRouterQuery({ address: address as string })
    }
  }, [router.isReady, router.query]);

  if (!org) return <Loader className="h-screen" />;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center mb-10">
      <div className="w-full h-88 relative group">
        <ImageBanner src={getImageURL(org.metadata.banner)} alt={org.metadata.name} />
        <RoundedLogo src={getImageURL(org.metadata.logo)} alt={org.metadata.name} />
      </div>
      <div className="container mx-auto mt-8 px-2 lg:px-0">
        <div className="flex gap-3 items-center mb-2">
          <span className="heading-1 text-left">
            {org.metadata.name} - {org.metadata.acronym && (org.metadata.acronym)}
          </span>
          {hasAccess && (
            <Button
              onClick={() => showUpdater()}
              className="flex items-center justify-evenly focus:outline-white bg-transparent px-2 p-1 font-bold"
            >
              <FiEdit className="text-darker" />{" "}
            </Button>
          )}
        </div>
        <span className="text-lg block mb-2 text-left text-neutrals-gray-5">
          {org.metadata.description}
        </span>
      </div>
      <AttestationGridView address={org.address} />
      <Delegates address={org.address} />
      <RevocationHistory address={org.address} />
    </div>
  );
}

