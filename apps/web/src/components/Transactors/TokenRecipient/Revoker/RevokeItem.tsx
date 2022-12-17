import AddressCopier from "components/Copier/AddressCopier";
import { AssociatedDataTrigger } from "components/Transactors/AssociatedData";
import { Cell, Row } from "components/UI/Table";
import { getImageURL } from "helper";
import Image from "next/image";
import { useGetSelectedTokens } from "services/admin/hooks";
import { useGetAttestation } from "services/attestations/hooks";
import { AttestationToken } from "services/attestations/types";
import { SelectRecipient } from "./Triggers";

export default function RevokeItem(props: { token: AttestationToken }) {
  const recipients = useGetSelectedTokens();
  const tokenRecipient = recipients.find(
    (r) => r.address === props.token.owner
  );
  const attestation = useGetAttestation(
    props.token.society,
    props.token.attestation
  );
  return (
    <Row
      className={`border-none table-row ${
        tokenRecipient?.is_deleted ? "bg-states-error line-through" : ""
      }`}
    >
      <Cell className="flex justify-start p-2">
        <div className="w-10 h-10 relative bg-gradient rounded-full">
          <Image
            src={getImageURL(attestation?.metadata?.image ?? "")}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={`${attestation?.metadata.name} image`}
            className="rounded-full block"
          />
        </div>
      </Cell>
      <Cell>{props.token.tokenId}</Cell>
      <Cell>
        <AddressCopier address={props.token.owner} />
      </Cell>
      <Cell>
        <AddressCopier address={props.token.issuedBy} />
      </Cell>
      <Cell>{new Date(props.token.issuedAt).toDateString()}</Cell>
      <Cell>
        <AssociatedDataTrigger
          org={props.token.society}
          address={props.token.owner}
        />
        <SelectRecipient isLoading={false} token={props.token} />
      </Cell>
    </Row>
  );
}
