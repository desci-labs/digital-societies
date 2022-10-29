import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { AssociatedDataValues } from "components/Transactors/types";
import { offchainMetaSchema } from "components/Transactors/schema";

export type Props = { address: string; Form: FC };

export default function MetadataUpdater({ address, Form }: Props) {
  if (!address) throw Error("user address is required");

  const methods = useForm<AssociatedDataValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      owner: address,
      facebook: "",
      github: "",
      linkedin: "",
      twitter: "",
      discord: "",
      notes: ""
    },
    resolver: yupResolver(offchainMetaSchema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
