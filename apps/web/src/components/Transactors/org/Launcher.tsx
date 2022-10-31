import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccount } from "wagmi";
import { Metadata, MetadataValues } from "../types";
import { metadataSchema } from "../schema";
import { FC } from "react";

export type Props = { Form: FC, metadata?: Metadata | MetadataValues }

export default function Launcher(props: Props) {
  const { address } = useAccount();

  const methods = useForm<MetadataValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: props?.metadata?.name ?? "",
      issuer: address,
      description: props?.metadata?.description ?? "",
      banner: typeof props?.metadata?.banner === "string" ? { ipfsURL: props?.metadata.banner } : {},
      image: typeof props?.metadata?.image === "string" ? { ipfsURL: props?.metadata?.image } : {},
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
