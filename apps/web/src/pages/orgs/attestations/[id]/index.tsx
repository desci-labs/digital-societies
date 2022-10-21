import Loader from "components/Loader";
import { useGetAttestation } from "services/attestations/hooks";
import { useGetOrg } from "services/orgs/hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ContentGrid } from "components/UI/Index";
import { IssuedTokens } from "components/UI/Attestation/Recipients/Index";
import MetaDataView from "components/UI/MetaDataView";

export default function CredentialDetails() {
  const router = useRouter();
  const [{ address, id }, setRouterQuery] = useState({ address: "", id: 0 });

  useEffect(() => {
    if (router.isReady) {
      const { id, address } = router.query;
      setRouterQuery({
        id: parseInt(id as string),
        address: address as string,
      });
    }
  }, [router.isReady, router.query]);

  const credential = useGetAttestation(address, id);

  const org = useGetOrg(address);

  const metadata = useMemo(
    () => credential?.metadata ?? org?.metadata,
    [credential, org]
  );

  if (!credential) return <Loader className="h-screen" />;
  if (!metadata) return null;

  return (
    <ContentGrid>
      <MetaDataView
        address={credential.address}
        verified={org?.verified || false}
        metadata={credential.metadata}
      />
      <IssuedTokens attestation={credential!} />
    </ContentGrid>
  );
}
