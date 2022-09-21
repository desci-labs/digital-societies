import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { GradientButton, Form, InputRow, Input } from "components/Form/Index";
import { useGetOrg } from "services/orgs/hooks";
import { DelegaterValues } from "../types";
import useGrantRole from "./useGrantRole";
import { useGetTxStage } from "services/transaction/hooks";

export default function DelegaterForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<DelegaterValues>();
  const router = useRouter();
  const stage = useGetTxStage();
  const { address } = router.query;
  const org = useGetOrg(address as string);
  const { grantRole, isLoading, isSuccess } = useGrantRole(org?.address!);
  const canDisable = useMemo(
    () => isSubmitting || isLoading || isSuccess,
    [isSubmitting, isLoading, isSuccess]
  );

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  return (
    <Form onSubmit={handleSubmit(grantRole)} title={org?.metadata.name} description="Grant Delegate role">
      <InputRow
        htmlFor="org"
        label="Organisation"
        className="text-sm"
      >
        <Input {...register('org')} disabled />
      </InputRow>
      <InputRow
        htmlFor="delegate"
        label="address"
        className="text-sm"
      >
        <ErrorMessage
          errors={errors}
          name="delegate"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <Input
          id="delegate"
          {...register("delegate")}
        />
      </InputRow>
      <GradientButton
        disabled={canDisable || !isValid}
        className="mt-10 w-full bg-black disabled:bg-regent-gray"
      >
        {isLoading ? stage.message || "Loading..." : "Grant role"}
      </GradientButton>
    </Form>
  );
}
