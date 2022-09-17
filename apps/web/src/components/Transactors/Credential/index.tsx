import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccount } from "wagmi";
import { MetadataValues } from "../types";
import { metadataSchema } from "../schema";
import { Org, PendingOrg } from "services/orgs/types";
import { FC } from "react";

export type Props = { org: Org | PendingOrg, Form: FC };

export default function CredentialLauncher({ org, Form }: Props) {
  if (!org || org.pending === true) throw Error("Organisation data is required");

  const { address } = useAccount();

  const methods = useForm<MetadataValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: org.metadata.name,
      issuer: address,
      symbol: org.metadata.symbol,
      description: org.metadata.description,
      image: typeof org.metadata.image === "string" ? { ipfsHash: org.metadata.image } : org.metadata.image,
      logo: typeof org.metadata.logo === "string" ? { ipfsHash: org.metadata.logo } : org.metadata.logo,
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

const isString = (param: string): boolean => typeof param === "string" ? true : false;