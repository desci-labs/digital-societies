import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button, InputRow, SelectInput } from "components/Form/Index";
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
    <div className="container mx-auto flex flex-col gap-5 border border-black py-8 max-w-500">
      <h1 className="text-3xl font-bold mt-5 text-center">
        {org?.metadata.name}
      </h1>
      <span className="text-lg text-center font-semibold">
        Issue a Credential
      </span>
      <div className="mx-auto flex justify-center w-400">
        <form className="w-full" onSubmit={handleSubmit(issueCredential)}>
          <InputRow
            htmlFor="addresses"
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
        </form>
      </div>
    </div>
  );
}
