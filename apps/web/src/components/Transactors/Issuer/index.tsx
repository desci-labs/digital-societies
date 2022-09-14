import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IssuerValues } from "../types";
import { issuerSchema } from "../schema";
import { Credential } from "context/Credential/CredentialContext";
import { FC } from "react";

export type Props = { credential: Credential; Form: FC };

export default function Issuer({ credential, Form }: Props) {
  if (!credential) throw Error("Credential data is required");

  const methods = useForm<IssuerValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      addresses: "",
      credential: credential.id,
    },
    resolver: yupResolver(issuerSchema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
