import Loader from "components/Loader";
import {
  useGetCredential,
} from "services/credentials/hooks";
import { useGetOrg, useIsAdminOrDelegate } from "services/orgs/hooks";
import { getImageURL } from "helper";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ImageBanner, RoundedLogo } from "components/UI/Index";
import { TokenTableView } from "components/UI/Credential/Index";
import { ActionButton, ActionButtons } from "components/ActionButtons/Index";
import useCredenter from "components/Transactors/Credential/useCredenter";

export default function CredentialDetails() {
  const router = useRouter();
  const [{ address, id }, setRouterQuery] = useState({ address: '', id: 0 });

  useEffect(() => {
    if (router.isReady) {
      const { id, address } = router.query;
      setRouterQuery({ id: parseInt(id as string), address: address as string })
    }
  }, [router.isReady, router.query]);

  const credential = useGetCredential(
    address,
    id
  );

  const org = useGetOrg(address);
  const showLauncher = useCredenter(org!, "update");
  const metadata = useMemo(
    () => credential?.metadata ?? org?.metadata,
    [credential, org]
  );
  const hasAccess = useIsAdminOrDelegate(org?.address!);

  if (!credential) return <Loader className="h-screen" />;
  if (!metadata) return null;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center mb-10">
      <div className="w-full h-88 relative group">
        {hasAccess && <ActionButtons>
          <ActionButton title="Edit Metadata" onClick={() => showLauncher()}>Edit credential</ActionButton>
        </ActionButtons>}
        <ImageBanner src={getImageURL(metadata?.banner ?? "")} />
        <RoundedLogo src={getImageURL(metadata?.badge ?? "")} />
      </div>
      <div className="container mx-auto mt-5">
        <span className="text-3xl block font-bold mb-2 text-left">
          {metadata.name} ({metadata.symbol})
        </span>
        <span className="text-lg block mb-2 text-left">
          {metadata.description}
        </span>
      </div>
      <TokenTableView id={credential.id} address={credential.address} />
    </div>
  );
}

