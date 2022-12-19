import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AttestationFormValues, LaunchMode } from "../types";
import { sbtMetadataSchema } from "../schema";
import { Org, PendingOrg } from "services/orgs/types";
import Popup from "components/UI/Popup/Index";
import { useGetAttestation } from "services/attestations/hooks";
import { useRouter } from "next/router";
import { useModalContext } from "components/Modal/Modal";
import { attestationTypes } from "../constants";

export type Props = {
  org: Org | PendingOrg;
  Form: JSX.Element;
  mode: LaunchMode;
};

export default function CredentialLauncher({ org, Form, mode }: Props) {
  const router = useRouter();
  const { showModal } = useModalContext();
  const { id } = router.query;
  const credential = useGetAttestation(org.address, id as string);
  const metadata = credential?.metadata ?? org.metadata;
  const methods = useForm<AttestationFormValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      mode,
      isDelegateRole: "false",
      name: metadata.name,
      description: metadata.description,
      properties: { description: metadata?.properties?.description ?? "" },
      attestationType:
        credential?.metadata?.attestationType || attestationTypes[0],
      image:
        typeof metadata.image === "string"
          ? { ipfsURL: metadata.image }
          : metadata.image,
      external_link: metadata.external_link,
    },
    resolver: yupResolver(sbtMetadataSchema),
  });

  if (org.pending) {
    showModal(Popup, {
      message: "This deployment of this org is still pending...",
    });
    return null;
  }

  return <FormProvider {...methods}>{Form}</FormProvider>;
}
