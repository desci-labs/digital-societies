import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Form, InputRow, LabelText, SelectInput } from "components/Form/Index";
import { useGetDesocMeta } from "services/orgs/hooks";
import { IssuerValues } from "../../types";
import { useGetAttestations } from "services/attestations/hooks";
import useUpdateTokenRecipients from "./useUpdateTokenRecipients";
import { Attestation, PendingAttestation } from "services/attestations/types";
import { useGetTxStage } from "services/transaction/hooks";
import Button from "components/UI/Button/Index";
import RecipientItem from "./RecipientItem";
import RecipientAdder from "./RecipientAdder/RecipientAdder";

export default function IssuerForm() {
  const {
    getValues,
    register,
    formState: { isSubmitting, errors },
  } = useFormContext<IssuerValues>();
  const stage = useGetTxStage();
  const orgAddress = getValues("org");
  const metadata = useGetDesocMeta(orgAddress);
  const attestations = useGetAttestations(orgAddress);
  const { issueAttestation, tokenRecipients, isLoading } =
    useUpdateTokenRecipients(orgAddress);
  const canDisable = useMemo(
    () => tokenRecipients.length === 0 || isSubmitting || isLoading,
    [tokenRecipients.length, isSubmitting, isLoading]
  );

  return (
    <Form
      title={metadata?.name}
      description="Issue an Attestation"
      onSubmit={() => {}}
    >
      <InputRow
        htmlFor="attestation"
        label="Select attestation"
        className="text-sm"
      >
        <SelectInput<Attestation | PendingAttestation>
          options={attestations}
          getOptionLabel={(data) => data.metadata.name}
          getOptionValue={(data) => data.id}
          {...register("attestation")}
        />
      </InputRow>
      <div className="flex flex-col gap-1 items-start justify-center">
        <LabelText text="Recipients" />
        {tokenRecipients.map((recipient) => (
          <RecipientItem key={recipient.address} recipient={recipient} />
        ))}
      </div>

      <InputRow htmlFor="address">
        <LabelText text="Add recipient" />
        <ErrorMessage
          errors={errors}
          name="address"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <RecipientAdder />
      </InputRow>
      <Button
        disabled={canDisable}
        onClick={issueAttestation}
        type="button"
        className="mt-10 w-full bg-primary disabled:bg-regent-gray"
      >
        {isLoading ? stage.message || "Loading..." : "Issue Credential"}
      </Button>
    </Form>
  );
}
