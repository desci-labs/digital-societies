import Loader from "components/Loader";
import {
  useGetCredential,
} from "services/credentials/hooks";
import { useGetOrg } from "services/orgs/hooks";
import { getImageURL } from "helper";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ImageBanner, RoundedLogo } from "components/UI/Index";
import { TokenTableView } from "components/UI/Credential/Index";

export default function CredentialDetails() {
  const router = useRouter();
  const { id, address } = router.query;
  const credential = useGetCredential(
    address as string,
    parseInt(id as string)
  );

  const org = useGetOrg(credential?.address ?? "");
  const metadata = useMemo(
    () => credential?.metadata ?? org?.metadata,
    [credential, org]
  );

  if (!credential) return <Loader className="h-screen" />;
  if (!metadata) return null;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center mb-10">
      <div className="w-full h-88 relative group">
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

