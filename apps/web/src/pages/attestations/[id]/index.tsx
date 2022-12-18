import { useGetAttestation } from "services/attestations/hooks";
import { useGetOrg, useIsAdminOrDelegate } from "services/orgs/hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ContentGrid } from "components/UI/Index";
import useCredenter from "components/Transactors/Attestation/useCredenter";
import { RevokedTokens } from "components/UI/Attestation/RevokedTokens";
import MetaDataView from "components/UI/MetaDataView";
import { RevokerForm } from "components/Transactors/TokenRecipient/Revoker/RevokerForm";
import TokenRecipientEditor from "components/Transactors/TokenRecipient/TokenRecipientEditor";
import TokenRecipients from "components/UI/Attestation/Recipients/Index";
import { Placeholder } from "components/UI/Desoc/DesocDetails";

export default function CredentialDetails() {
  const router = useRouter();
  const [{ address, id }, setRouterQuery] = useState({ address: "", id: "" });

  useEffect(() => {
    if (router.isReady) {
      const { id, address } = router.query;
      setRouterQuery({
        id: id as string,
        address: address as string,
      });
    }
  }, [router.isReady, router.query]);

  const credential = useGetAttestation(address, id);
  const org = useGetOrg(address);
  const showLauncher = useCredenter(org, "update");

  const metadata = useMemo(
    () =>
      credential?.metadata
        ? { ...credential?.metadata, banner: org?.metadata.banner }
        : org?.metadata,
    [credential, org]
  );
  const hasAccess = useIsAdminOrDelegate(org?.address ?? "");
  if (!credential || !metadata) return <Placeholder />;

  return (
    <ContentGrid>
      <MetaDataView
        address={credential.society}
        verified={org?.verified || false}
        metadata={credential.metadata}
        banner={metadata.banner ?? ""}
        showUpdater={hasAccess}
        onUpdateClick={showLauncher}
      />
      {!hasAccess && <TokenRecipients attestation={credential} />}
      {hasAccess && (
        <>
          <TokenRecipientEditor Form={RevokerForm} attestation={credential} />
          <RevokedTokens attestation={credential} />
        </>
      )}
    </ContentGrid>
  );
}
