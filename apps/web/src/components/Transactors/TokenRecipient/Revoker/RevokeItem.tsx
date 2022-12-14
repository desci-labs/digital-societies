import AddressCopier from "components/Copier/AddressCopier";
import { AssociatedDataTrigger } from "components/Transactors/AssociatedData";
import { Cell, Row } from "components/UI/Table";
import { useGetSelectedTokens } from "services/admin/hooks";
import { AttestationToken } from "services/attestations/types";
import { SelectRecipient } from "./Triggers";

export default function RevokeItem(props: { token: AttestationToken }) {
  const recipients = useGetSelectedTokens();
  const tokenRecipient = recipients.find(
    (r) => r.address === props.token.owner
  );

  return (
    <Row
      className={`border-none table-row ${
        tokenRecipient?.is_deleted ? "bg-states-error line-through" : ""
      }`}
    >
      <Cell>{props.token.tokenId}</Cell>
      <Cell>
        <AddressCopier address={props.token.owner} />
      </Cell>
      <Cell>
        <AddressCopier address={props.token.issuer} />
      </Cell>
      <Cell>
        <AssociatedDataTrigger
          org={props.token.org}
          address={props.token.owner}
        />
        <SelectRecipient isLoading={false} token={props.token} />
      </Cell>
    </Row>
  );
}
