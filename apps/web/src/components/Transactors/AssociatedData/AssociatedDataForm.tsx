import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Form, InputRow, Input, Textarea } from "components/Form/Index";
import { useGetOrg } from "services/orgs/hooks";
import { useGetTxStage } from "services/transaction/hooks";
import { useMemo } from "react";
import Button from "components/UI/Button/Index";
import {
  ASSOCIATED_SOCIALS,
  AssociatedDataValues,
  Socials,
} from "components/Transactors/types";
import useRouterAddress from "hooks/useRouterAddress";
import useSaveMetadata from "./useSaveMetadata";
import { maskAddress } from "helper";

const placeholders: Record<Socials[number], string> = {
  facebook: "https://facebook.com/desciety",
  twitter: "https://twitter.com/desciety",
  linkedin: "https://linkedin.com/desciety",
  github: "https://github.com/desciety",
  discord: "https://discord.com/users/394939327022497802",
};

export default function AssociatedDataForm() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<AssociatedDataValues>();
  const orgAddress = useRouterAddress();
  const stage = useGetTxStage();
  const org = useGetOrg(orgAddress);
  const { save, isLoading } = useSaveMetadata(orgAddress);
  const canDisable = useMemo(
    () => isSubmitting || isLoading,
    [isSubmitting, isLoading]
  );

  return (
    <Form
      onSubmit={handleSubmit(save)}
      title="Associated Metadata"
      description={maskAddress(getValues("address"))}
      className="form"
    >
      <>
        {ASSOCIATED_SOCIALS.map((name) => (
          <InputRow htmlFor={name} label={name} className="text-sm" key={name}>
            <ErrorMessage
              errors={errors}
              name={name}
              as="span"
              className="text-xs text-left text-red-400 font-semibold m-0"
            />
            <Input id={name} {...register(name)} className="py-2" placeholder={placeholders[name]} />
          </InputRow>
        ))}
      </>
      <InputRow htmlFor="notes" label="Notes">
        <Textarea id="notes" {...register("notes")} placeholder="Extra notes on this recipient" />
      </InputRow>
      <Button
        disabled={canDisable || !isValid}
        className="mt-10 w-full bg-tint-primary-dark disabled:bg-regent-gray"
      >
        {isLoading ? stage.message || "Loading..." : "Save"}
      </Button>
    </Form>
  );
}
