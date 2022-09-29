import { useRouter }  from "next/router";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Form, InputRow, SelectInput } from "components/Form/Index";
import { useGetOrg } from "services/orgs/hooks";
import { IssuerValues } from "../types";
import {
  useGetCredentials,
} from "services/credentials/hooks";
import useIssueCredential from "./useIssueCredential";
import { Credential, PendingCredential } from "services/credentials/types";
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
  const credentials = useGetCredentials(org?.address ?? '');
  const { issueCredential, isLoading } = useIssueCredential(org?.address!);
  const canDisable = useMemo(
    () => isSubmitting || isLoading,
    [isSubmitting, isLoading]
  );

  return (
    <Form onSubmit={handleSubmit(issueCredential)} title={org?.metadata.name} description="Issue a Credential" className="bg-transparent">
      <InputRow
        htmlFor="credential"
        label="Select credential"
        className="text-sm"
      >
        <SelectInput<Credential | PendingCredential>
          options={credentials}
          getOptionLabel={(data) => data.metadata.name}
          getOptionValue={(data) => data.id}
          {...register("credential")}
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
