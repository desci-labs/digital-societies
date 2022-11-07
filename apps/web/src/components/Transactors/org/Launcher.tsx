import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Metadata, MetadataValues } from "../types";
import { metadataSchema } from "../schema";
import { FC } from "react";

export type Props = JSX.IntrinsicAttributes & {
  Form: FC;
  metadata?: Metadata | MetadataValues;
};

export default function Launcher(props: Props) {
  const methods = useForm<MetadataValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: props?.metadata?.name ?? "",
      symbol: props?.metadata?.symbol ?? props?.metadata?.acronym,
      description: props?.metadata?.description ?? "",
      banner:
        typeof props?.metadata?.banner === "string"
          ? { ipfsURL: props?.metadata.banner }
          : {},
      image:
        typeof props?.metadata?.image === "string"
          ? { ipfsURL: props?.metadata?.image }
          : {},
      external_link: props?.metadata?.external_link,
    },
    resolver: yupResolver(metadataSchema),
  });

  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
