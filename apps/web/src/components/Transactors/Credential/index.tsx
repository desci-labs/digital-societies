import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccount } from "wagmi";
import { MetadataValues } from "../types";
import { metadataSchema } from "../schema";
import { Org, PendingOrg } from "services/orgs/types";
import { FC } from "react";
import Popup from "components/UI/Popup/Index";

export type Props = { org: Org | PendingOrg, Form: FC };

export default function CredentialLauncher({ org, Form }: Props) {
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

  if (org.pending) return <Popup message="This deployment of this org is still pending..." />

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

const isString = (param: string): boolean => typeof param === "string" ? true : false;