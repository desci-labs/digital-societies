import Loader from "components/Loader";
import { useGetAttestation } from "services/attestations/hooks";
import { useGetOrg, useIsAdminOrDelegate } from "services/orgs/hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ContentGrid } from "components/UI/Index";
import useCredenter from "components/Transactors/Attestation/useCredenter";
import { IssuedTokens } from "components/UI/Attestation/Recipients/Index";
import { RevokedTokens } from "components/UI/Attestation/RevokedTokens";
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
  const showLauncher = useCredenter(org!, "update");
  const metadata = useMemo(
    () => credential?.metadata ?? org?.metadata,
    [credential, org]
  );
  const hasAccess = useIsAdminOrDelegate(org?.address!);

  if (!credential) return <Loader className="h-screen" />;
  if (!metadata) return null;

  return (
    <ContentGrid>
      {org && (
        <MetaDataView
          address={org.address}
          verified={org.verified}
          metadata={org.metadata}
          showUpdater={hasAccess}
          onUpdateClick={showLauncher}
        />
      )}
      <IssuedTokens attestation={credential!} showUpdater={hasAccess} />
      <RevokedTokens attestation={credential!} />
    </ContentGrid>
  );
}