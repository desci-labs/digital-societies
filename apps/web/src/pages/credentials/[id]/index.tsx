import Loader from "components/Loader";
import {
  useGetCredential,
} from "services/credentials/hooks";
import { useGetOrg, useIsAdminOrDelegate } from "services/orgs/hooks";
import { getImageURL } from "helper";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ImageBanner, RoundedLogo } from "components/UI/Index";
import useCredenter from "components/Transactors/Credential/useCredenter";
import Button from "components/UI/Button/Index";
import { FiEdit } from "react-icons/fi";
import { IssuedTokens } from "components/UI/Credential/IssuedTokens";

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
        <ImageBanner src={getImageURL(metadata?.banner ?? "")} />
        <RoundedLogo src={getImageURL(metadata?.badge ?? "")} />
      </div>
      <div className="container mx-auto mt-8 px-2 lg:px-0">
        <div className="flex gap-3 items-center mb-2">
          <span className="heading-1 text-left">
            {metadata.name} - {metadata.symbol && (metadata.symbol)}
          </span>
          {hasAccess && (
            <Button
              onClick={() => showLauncher()}
              className="flex items-center justify-evenly outline-none bg-transparent px-2 p-1 font-bold"
            >
              <FiEdit className="text-darker" />{" "}
            </Button>
          )}
        </div>
        <span className="text-lg block mb-2 text-left text-neutrals-gray-5">
          {metadata.description}
        </span>
      </div>
      <IssuedTokens id={credential.id} address={credential.address} />
    </div>
  );
}

