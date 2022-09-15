import { Button } from "components/Form/Index";
import Loader from "components/Loader";
import useRevokeCredential from "components/Transactors/Issuer/useRevokeCredential";
import { Cell, Row, Table, TBody, THead } from "components/UI/Table";
import {
  useGetCredential,
  useGetCredentialTokens,
} from "context/Credential/CredentialContext";
import { useCanMutateOrg, useGetOrg } from "services/orgs/hooks";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import { useRouter } from "next/router";
import { RiCloseLine } from "react-icons/ri";
import AddressOrEns from "components/AddressOrEns/Index";
import useIssuer from "components/Transactors/Issuer/useIssuer";
import { AiOutlinePlus } from "react-icons/ai";
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
  // const hasAccess = useCanMutateOrg(credential?.address!);
  const org = useGetOrg(credential?.address ?? "");
  const metadata = useMemo(
    () => credential?.metadata ?? org?.metadata,
    [credential, org]
  );

  if (!credential) return <Loader className="h-screen" />;
  if (!metadata) return null;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center mb-10">
      <div className="w-full h-104 relative group">
        <ImageBanner ipfsHash={metadata?.image ?? ""} />
        <RoundedLogo ipfsHash={metadata?.logo ?? ""} />
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

