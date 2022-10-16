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
      acronym: props?.metadata?.acronym ?? "",
      description: props?.metadata?.description ?? "",
      banner: typeof props?.metadata?.banner === "string" ? { ipfsHash: props?.metadata.banner } : {},
      logo: typeof props?.metadata?.logo === "string" ? { ipfsHash: props?.metadata?.logo } : {},
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
