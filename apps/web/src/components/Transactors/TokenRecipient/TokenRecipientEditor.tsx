import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IssuerValues } from "../types";
import { issuerSchema } from "../schema";
import { FC } from "react";
import { Attestation, PendingAttestation } from "services/attestations/types";

export type Props = JSX.IntrinsicAttributes & {
  attestation: Attestation | PendingAttestation;
  Form: FC;
};

export default function TokenRecipientEditor({ attestation, Form }: Props) {
  if (!attestation) throw Error("Credential data is required");

  const methods = useForm<IssuerValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      society: attestation.society,
      attestation: attestation.id,
      address: "",
    },
    resolver: yupResolver(issuerSchema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
