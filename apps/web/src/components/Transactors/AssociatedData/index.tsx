import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { offchainMetaSchema } from "components/Transactors/schema";
import { useAccountMetadata } from "services/api/hooks";
import { AssociatedDataUpdate } from "services/api/types";
import useMetaDetails from "./useMetaDetails";
import Button from "components/UI/Button/Index";
import Icon from "components/Icons/Icons";

export type Props = JSX.IntrinsicAttributes & {
  address: string;
  org: string;
  Form: FC;
};

export default function MetadataUpdater({ address, org, Form }: Props) {
  if (!address) throw Error("user address is required");
  const { data } = useAccountMetadata(org, address);

  const methods = useForm<AssociatedDataUpdate>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      id: data?.id,
      owner: address,
      org: data?.org ?? org,
      metadata: {
        Facebook: data?.metadata.Facebook ?? "",
        Github: data?.metadata.Github ?? "",
        Linkedin: data?.metadata.Linkedin ?? "",
        Twitter: data?.metadata.Twitter ?? "",
        Discord: data?.metadata.Discord ?? "",
        notes: data?.metadata.notes ?? "",
      },
    },
    resolver: yupResolver(offchainMetaSchema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

export function AssociatedDataTrigger(props: {
  address: string;
  org: string;
  disabled?: boolean;
}) {
  const trigger = useMetaDetails(props.address, props.org);
  const { isLoading } = useAccountMetadata(props.org, props.address);

  if (isLoading) return null;

  return (
    <Button
      onClick={trigger}
      disabled={props.disabled}
      className={`bg-transparent bg-white bg-opacity-0 px-0 py-0 w-10 outline-0`}
    >
      <Icon
        type="Edit"
        size={18}
        tabIndex={0}
        focusable
        className="app-text hover:text-white focus:text-white dark:hover:text-tint-primary dark:focus:text-tint-primary"
      />
    </Button>
  );
}
