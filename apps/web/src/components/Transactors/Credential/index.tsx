import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccount } from "wagmi";
import { MetadataValues } from "../types";
import { metadataSchema } from "../schema";
import { Org } from "context/Factory/FactoryContext";
import { FC } from "react";

export type Props = { org: Org, Form: FC };

export default function CredentialLauncher({ org, Form }: Props) {
  if (!org) throw Error("Organisation data is required");

  const { address } = useAccount();

  const methods = useForm<MetadataValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: org.metadata.name,
      issuer: address,
      symbol: org.metadata.symbol,
      description: org.metadata.description,
      image: { ipfsHash: org.metadata.image },
      logo: { ipfsHash: org.metadata.logo },
      external_link: org.metadata.external_link,
    },
    resolver: yupResolver(metadataSchema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
