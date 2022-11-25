import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Form, InputRow, Input } from "components/Form/Index";
import { useGetOrg } from "services/orgs/hooks";
import { DelegaterValues } from "../types";
import useGrantRole from "./useGrantRole";
import { useGetTxStage } from "services/transaction/hooks";
import { useMemo } from "react";
import Button from "components/UI/Button/Index";

export default function DelegaterForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<DelegaterValues>();
  const router = useRouter();
  const stage = useGetTxStage();
  const { address } = router.query;
  const org = useGetOrg(address as string);
  const { grantRole, isLoading } = useGrantRole(org?.address ?? "");
  const canDisable = useMemo(
    () => isSubmitting || isLoading,
    [isSubmitting, isLoading]
  );
  if (!org) return null;

  return (
    <Form
      onSubmit={handleSubmit(grantRole)}
      title={org?.metadata.name}
      description="Grant Delegate role"
      className="form"
    >
      <InputRow label="org" labelText="Organisation" className="text-sm">
        <Input {...register("org")} disabled />
      </InputRow>
      <InputRow label="delegate" labelText="address" className="text-sm">
        <ErrorMessage
          errors={errors}
          name="delegate"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <Input id="delegate" {...register("delegate")} />
      </InputRow>
      <Button
        disabled={canDisable || !isValid}
        className="mt-10 w-full bg-tint-primary-dark disabled:bg-regent-gray"
      >
        {isLoading ? stage.message || "Loading..." : "Grant role"}
      </Button>
    </Form>
  );
}
