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
      banner: typeof org.metadata.banner === "string" ? { ipfsHash: org.metadata.banner } : org.metadata.banner,
      badge: typeof org.metadata.badge === "string" ? { ipfsHash: org.metadata.badge } : org.metadata.badge,
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