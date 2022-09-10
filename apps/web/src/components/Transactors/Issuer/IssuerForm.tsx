import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button, Form, InputRow, SelectInput } from "components/Form/Index";
import { useGetOrg } from "context/Factory/FactoryContext";
import { IssuerValues } from "../types";
import {
  Credential,
  useGetCredentials,
} from "context/Credential/CredentialContext";
import useIssueCredential from "./useIssueCredential";

export default function LaunchForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<IssuerValues>();
  const router = useRouter();
  const { address } = router.query;
  const org = useGetOrg(address as string);
  const { data } = useGetCredentials();
  const { issueCredential, isLoading, isSuccess } = useIssueCredential(org?.address!);
  const canDisable = useMemo(
    () => isSubmitting || isLoading || isSuccess,
    [isSubmitting, isLoading, isSuccess]
  );

  const credentialOptions = useMemo(
    () => data[org?.address!] ?? [],
    [data, org]
  );

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  return (

    <Form onSubmit={handleSubmit(issueCredential)} title={org?.metadata.name} description="Issue a Credential">
      <InputRow
        htmlFor="credential"
        label="Select credential"
        className="text-sm"
      >
        <SelectInput<Credential>
          options={credentialOptions}
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
          className="w-full border p-2 rounded-xl appearance-none resize-none h-20"
          {...register("addresses")}
        />
      </InputRow>
      <Button
        disabled={canDisable || !isValid}
        className="mt-10 w-full bg-black disabled:bg-regent-gray"
      >
        Deploy
      </Button>
    </Form>
  );
}
