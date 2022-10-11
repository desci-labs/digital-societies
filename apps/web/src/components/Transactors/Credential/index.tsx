import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccount } from "wagmi";
import { LauncherFormValues, LaunchMode } from "../types";
import { metadataSchema } from "../schema";
import { Org, PendingOrg } from "services/orgs/types";
import { FC } from "react";
import Popup from "components/UI/Popup/Index";
import { useGetCredential } from "services/credentials/hooks";
import { useRouter } from "next/router";
import { useModalContext } from "components/Modal/Modal";

export type Props = { org: Org | PendingOrg, Form: FC, mode: LaunchMode };

export default function CredentialLauncher({ org, Form, mode }: Props) {
  const { address } = useAccount();
  const router = useRouter();
  const { showModal } = useModalContext()
  const { id } = router.query;
  const credential = useGetCredential(org.address, parseInt(id as string));
  const metadata = credential?.metadata ?? org.metadata;

  const methods = useForm<LauncherFormValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      mode,
      name: metadata.name,
      issuer: address,
      symbol: metadata.symbol,
      description: metadata.description,
      banner: typeof metadata.banner === "string" ? { ipfsHash: metadata.banner } : metadata.banner,
      badge: typeof metadata.badge === "string" ? { ipfsHash: metadata.badge } : metadata.badge,
      external_link: metadata.external_link,
    },
    resolver: yupResolver(metadataSchema),
  });

  if (org.pending) {
    showModal(Popup, { message: "This deployment of this org is still pending..." });
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}