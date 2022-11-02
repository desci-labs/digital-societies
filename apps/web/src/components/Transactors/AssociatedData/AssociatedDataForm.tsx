import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Form, InputRow, Input, Textarea } from "components/Form/Index";
import { useGetTxStage } from "services/transaction/hooks";
import Button from "components/UI/Button/Index";
import {
  ASSOCIATED_SOCIALS,
  Socials,
} from "components/Transactors/types";
import useRouterAddress from "hooks/useRouterAddress";
import useHandleUpdate from "./useHandleUpdate";
import { maskAddress } from "helper";
import { AssociatedDataUpdate } from "services/api/types";
import Icon from "components/Icons/Icons";
import Copier from "components/Copier/Index";

const placeholders: Partial<Record<Socials[number], string>> = {
  Facebook: "https://facebook.com/desciety",
  Twitter: "https://twitter.com/desciety",
  Linkedin: "https://linkedin.com/desciety",
  Github: "https://github.com/desciety",
  Discord: "https://discord.com/users/394939327022497802",
};

export default function AssociatedDataForm() {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { isValid, errors },
  } = useFormContext<AssociatedDataUpdate>();
  const orgAddress = useRouterAddress();
  const stage = useGetTxStage();
  const { save, isLoading, error } = useHandleUpdate(orgAddress);

  return (
    <Form
      onSubmit={handleSubmit(save)}
      title="Associated Metadata"
      description={maskAddress(getValues("owner"))}
      className="form"
    >
      {error && <span className="text-states-error text-md inline-block w-full">Error: {error}</span>}
      <>
        {ASSOCIATED_SOCIALS.map((name) => (
          <InputRow htmlFor={name} label={name} className="text-sm" key={name}>
            <ErrorMessage
              errors={errors}
              name={name}
              as="span"
              className="text-xs text-left text-red-400 font-semibold m-0"
            />
            <div className="flex items-center justify-between w-full border border-neutrals-gray-3 px-2 ">
              <div className="flex flex-auto items-center justify-start gap-1">
                <Icon type={name} size={18} />
                <Input id={name} {...register(`metadata.${name}`)} className="py-2 border-none" placeholder={placeholders[name]} />
              </div>
              <ActionButtons link={watch(`metadata.${name}`)} />
            </div>
          </InputRow>
        ))}
      </>
      <InputRow htmlFor="notes" label="Notes">
        <Textarea id="notes" {...register("metadata.notes")} placeholder="Extra notes on this recipient or delegate" />
      </InputRow>
      <Button
        disabled={isLoading || !isValid}
        className="mt-10 w-full bg-tint-primary-dark disabled:bg-regent-gray"
      >
        {isLoading ? stage.message || "saving..." : "Save"}
      </Button>
    </Form>
  );
}

function ActionButtons(props: { link: string }) {
  if (!props.link) return null;

  return (
    <div className="flex items-center justify-end gap-2">
      <Copier text={props.link} classes="hover:text-tint-primary" />
      <a href={props.link} target="_blank" rel="noreferrer" className="hover:text-tint-primary">view</a>
    </div>
  )
}
