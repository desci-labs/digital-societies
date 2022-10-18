import AddressCopier from "components/Copier/AddressCopier";
import useRevokeToken from "components/Transactors/Issuer/useRevokeToken";
import { getImageURL } from "helper";
import Image from "next/image";
import { useGetAttestationTokens } from "services/attestations/hooks";
import { Attestation, PendingAttestation } from "services/attestations/types";
import { useIsDelegate } from "services/orgs/hooks";
import { CardContainer } from "../../Index";
import { Cell, Row, Table, TBody, THead } from "../../Table";
import { RevokeButton, Updater } from "./Triggers";

export function IssuedTokens({
  attestation,
  showUpdater
}: {
  attestation: Attestation | PendingAttestation;
  showUpdater?: boolean;
}) {
  const tokens = useGetAttestationTokens(attestation.address, attestation.id);
  const { revoke, isLoading } = useRevokeToken(attestation?.address!);
  const hasAccess = useIsDelegate(attestation?.address ?? "");
  if (!attestation) return null;

  const getRows = () => {
    const rows = ["logo", "TokenId", "receipient", "issuer", "date Issued"];
    return hasAccess ? rows.concat(["Revoke"]) : rows;
  };

  return (
    <CardContainer>
      {showUpdater && <div className="flex justify-between items-center mb-5 text-neutrals-gray-7">
        <h1 className="text-left heading-2">Recipients</h1>
        <Updater attestation={attestation} />
      </div>}
      <Table>
        <THead rows={getRows()} />
        <TBody>
          {tokens &&
            tokens.map((token, idx) => (
              <Row key={idx} className="border-none table-row">
                <Cell className="p-2 h-full">
                  <div className="w-10 h-10 relative bg-gradient rounded-full">
                    <Image
                      src={getImageURL(
                        attestation?.metadata?.image ??
                        attestation?.metadata?.banner
                      )}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt={`${attestation?.metadata.name} image`}
                      className="rounded-full block"
                    />
                  </div>
                </Cell>
                <Cell>{token.tokenId}</Cell>
                <Cell>
                  <AddressCopier address={token.owner} />
                </Cell>
                <Cell>
                  <AddressCopier address={token.issuer} />
                </Cell>
                <Cell>{new Date(token.dateIssued).toDateString()}</Cell>
                {showUpdater && (
                  <Cell className="p-0">
                    <RevokeButton onRevoke={() => revoke(token)} isLoading={isLoading} />
                  </Cell>
                )}
              </Row>
            ))}
        </TBody>
      </Table>
    </CardContainer>
  );
}
