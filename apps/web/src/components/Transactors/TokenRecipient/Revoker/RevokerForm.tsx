import { IssuerValues } from "components/Transactors/types";
import { CardContainer } from "components/UI/Index";
import { Table, TBody, THead } from "components/UI/Table";
import { useFormContext } from "react-hook-form";
import {
  useGetAttestation,
  useGetAttestationTokens,
} from "services/attestations/hooks";
import RevokeItem from "./RevokeItem";
import ToolBar from "./ToolBar";

export function RevokerForm() {
  const { getValues } = useFormContext<IssuerValues>();
  const attestation = useGetAttestation(
    getValues("society"),
    getValues("attestation")
  );
  const tokens = useGetAttestationTokens(
    attestation?.society || "",
    attestation?.id ?? ""
  );
  if (!attestation) return null;

  const getRows = () => {
    return ["TokenId", "Recipient", "issuer", "Action"];
  };

  return (
    <CardContainer>
      <ToolBar attestation={attestation} />
      <Table>
        <THead rows={getRows()} />
        <TBody>
          {tokens.map((token, idx) => (
            <RevokeItem key={idx} token={token} />
          ))}
        </TBody>
      </Table>
    </CardContainer>
  );
}
