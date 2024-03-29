import AddressCopier from "components/Copier/AddressCopier";
import { getImageURL } from "helper";
import Image from "next/image";
import { useGetRevokedAttestationTokens } from "services/attestations/hooks";
import { Attestation, PendingAttestation } from "services/attestations/types";
import { CardContainer } from "../Index";
import { Cell, Row, Table, TBody, THead } from "../Table";

export function RevokedTokens({
  attestation,
}: {
  attestation: Attestation | PendingAttestation;
}) {
  const tokens = useGetRevokedAttestationTokens(
    attestation.society,
    attestation.id
  );

  const getRows = () => {
    return [
      "Badge",
      "Attestation ID",
      "recipient",
      "revoked by",
      "date revoked",
    ];
  };

  return (
    <CardContainer>
      <div className="flex justify-between items-center mb-5 text-neutrals-gray-7 mb-2">
        <h1 className="heading-2">Revoked Attestations</h1>
      </div>
      <Table>
        <THead className="text-primary" rows={getRows()} />
        <TBody>
          {tokens.map((revoked, idx) => (
            <Row key={idx} className="border-none table-row">
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative bg-gradient rounded-full">
                  <Image
                    src={getImageURL(attestation?.metadata?.image)}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={`${attestation?.metadata.name} image`}
                    className="rounded-full block"
                  />
                </div>
              </Cell>
              <Cell>{revoked.tokenId}</Cell>
              <Cell>
                <AddressCopier address={revoked.owner} />
              </Cell>
              <Cell>
                <AddressCopier address={revoked.revokedBy} />
              </Cell>
              <Cell>{new Date(revoked.revokedAt).toDateString()}</Cell>
            </Row>
          ))}
        </TBody>
      </Table>
    </CardContainer>
  );
}
