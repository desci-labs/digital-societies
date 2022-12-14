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
      properties: {
        description: props.metadata?.properties?.description ?? "",
      },
      banner:
        typeof props?.metadata?.banner === "string"
          ? { ipfsURL: props?.metadata.banner }
          : props.metadata?.banner ?? { ipfsURL: "" },
      image:
        typeof props?.metadata?.image === "string"
          ? { ipfsURL: props?.metadata?.image }
          : props.metadata?.image ?? { ipfsURL: "" },
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
