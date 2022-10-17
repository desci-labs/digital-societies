import { useRouter }  from "next/router";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Form, InputRow, SelectInput } from "components/Form/Index";
import { useGetOrg } from "services/orgs/hooks";
import { IssuerValues } from "../types";
import {
  useGetAttestations,
} from "services/attestations/hooks";
import useIssueAttestation from "./useIssueAttestation";
import { Attestation, PendingAttestation } from "services/attestations/types";
import { useGetTxStage } from "services/transaction/hooks";
import Button from "components/UI/Button/Index";

export default function IssuerForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<IssuerValues>();
  const router = useRouter();
  const { address } = router.query;
  const stage = useGetTxStage();
  const org = useGetOrg(address as string);
  const attestations = useGetAttestations(org?.address ?? '');
  const { issueAttestation, isLoading } = useIssueAttestation(org?.address!);
  const canDisable = useMemo(
    () => isSubmitting || isLoading,
    [isSubmitting, isLoading]
  );

  return (
    <Form onSubmit={handleSubmit(issueAttestation)} title={org?.metadata.name} description="Issue an Attestation" className="form">
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
      <InputRow
        htmlFor="addresses"
        label="address: (comma separated list)"
        className="text-sm"
      >
        <ErrorMessage
          errors={errors}
          name="addresses"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <textarea
          id="addresses"
          className="w-full bg-transparent outline-none text-white border border-neutrals-gray-3 focus:border-neutrals-gray-5 p-2 rounded-xl appearance-none resize-none h-20"
          {...register("addresses")}
        />
      </InputRow>
      <Button
        disabled={canDisable || !isValid}
        className="mt-10 w-full bg-tint-primary-dark disabled:bg-regent-gray"
      >
        {isLoading ? stage.message || "Loading..." : "Issue Credential"}
      </Button>
    </Form>
  );
}
