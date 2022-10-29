import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { offchainMetaSchema } from "components/Transactors/schema";
import { useAccountMetadata } from "services/api/hooks";
import { AssociatedDataUpdate } from "services/api/types";

export type Props = { address: string; org: string; Form: FC };

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
        facebook: data?.metadata.facebook ?? "",
        github: data?.metadata.github ?? "",
        linkedin: data?.metadata.linkedin ?? "",
        twitter: data?.metadata.twitter ?? "",
        discord: data?.metadata.discord ?? "",
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
